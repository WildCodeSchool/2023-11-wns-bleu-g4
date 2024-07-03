import { Resolver, Query, Arg, Mutation, Int, Ctx, Authorized } from "type-graphql"
import { GraphQLError } from "graphql"
import { ILike } from "typeorm"
import { Context } from "../utils"
import { UserRole } from "../entities/User"
import Category, { NewCategoryInput, UpdateCategoryInput } from "../entities/Category"

@Resolver()
class CategoryResolver {
	@Query(() => [Category])
	async getAllCategories(
		@Arg("productId", () => Int, { nullable: true }) productId?: number,
		@Arg("subCategoryId", () => Int, { nullable: true }) subCategoryId?: number,
		@Arg("name", { nullable: true }) name?: string
	) {
		return Category.find({
			relations: { products: true, parentCategory: true },
			where: {
				name: name ? ILike(`%${name}%`) : undefined,
				products: { id: productId },
				parentCategory: { id: subCategoryId },
			},
		})
	}

	@Query(() => Category)
	async getCategoryById(@Arg("categoryId", () => Int) id: number) {
		const category = await Category.findOne({
			where: { id },
			relations: { products: true, parentCategory: true },
		})
		if (!category) throw new GraphQLError("Not found")
		return category
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Category)
	async createCategory(@Arg("data", { validate: true }) data: NewCategoryInput, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const newCategory = new Category()

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")
		Object.assign(newCategory, data)

		const { id } = await newCategory.save()
		return Category.findOne({
			where: { id },
			relations: { products: true, parentCategory: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Category)
	async updateCategory(
		@Arg("categoryId") id: number,
		@Arg("data", { validate: true }) data: UpdateCategoryInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const categoryToUpdate = await Category.findOne({ where: { id } })
		if (!categoryToUpdate) throw new GraphQLError("Category not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")
		await Object.assign(categoryToUpdate, data)

		await categoryToUpdate.save()
		return Category.findOne({
			where: { id },
			relations: { products: true, parentCategory: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => String)
	async deleteCategory(@Arg("categoryId") id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const categoryToDelete = await Category.findOne({ where: { id } })
		if (!categoryToDelete) throw new GraphQLError("Category not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		await categoryToDelete.remove()
		return "Category deleted"
	}
}

export default CategoryResolver
