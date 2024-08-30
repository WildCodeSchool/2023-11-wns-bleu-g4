import { Resolver, Query, Arg, Mutation, Int, Ctx, Authorized } from "type-graphql"
import { GraphQLError } from "graphql"
import { ILike } from "typeorm"
import { Context } from "../utils"
import { UserRole } from "../entities/User"
import ParentCategory, { NewParentCategoryInput, UpdateParentCategoryInput } from "../entities/ParentCategory"

@Resolver()
class ParentCategoryResolver {
	@Query(() => [ParentCategory])
	async getAllParentCategories(
		@Arg("name", { nullable: true }) name?: string,
		@Arg("categoryId", () => Int, { nullable: true }) categoryId?: number
	) {
		return ParentCategory.find({
			where: {
				name: name ? ILike(`'%${name}%'`) : undefined,
				categories: { id: categoryId },
			},
			relations: { categories: true },
		})
	}

	@Query(() => ParentCategory)
	async getParentCategoryById(@Arg("parentCategoryId", () => Int) id: number) {
		const parentCategory = await ParentCategory.findOne({
			where: { id },
			relations: { categories: true },
		})
		if (!parentCategory) throw new GraphQLError("Not found")
		return parentCategory
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => ParentCategory)
	async createParentCategory(@Arg("data", { validate: true }) data: NewParentCategoryInput, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const newParentCategory = new ParentCategory()

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")
		Object.assign(newParentCategory, data)

		const { id } = await newParentCategory.save()
		return ParentCategory.findOne({
			where: { id },
			relations: { categories: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => ParentCategory)
	async updateParentCategory(
		@Arg("parentCategoryId", () => Int) id: number,
		@Arg("data", { validate: true }) data: UpdateParentCategoryInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const parentCategoryToUpdate = await ParentCategory.findOne({ where: { id } })
		if (!parentCategoryToUpdate) throw new GraphQLError("Parent Category not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")
		await Object.assign(parentCategoryToUpdate, data)

		await parentCategoryToUpdate.save()
		return ParentCategory.findOne({
			where: { id },
			relations: { categories: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => String)
	async deleteParentCategory(@Arg("parentCategoryId", () => Int) id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const parentCategoryToDelete = await ParentCategory.findOne({ where: { id } })
		if (!parentCategoryToDelete) throw new GraphQLError("Parent Category not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		await parentCategoryToDelete.remove()
		return "Parent Category deleted"
	}
}

export default ParentCategoryResolver
