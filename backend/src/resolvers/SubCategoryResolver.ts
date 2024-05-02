import {
	Resolver,
	Query,
	Arg,
	Mutation,
	Int,
	Ctx,
	Authorized,
} from "type-graphql"
import { GraphQLError } from "graphql"
import { ILike } from "typeorm"
import { Context } from "../utils"
import { UserRole } from "../entities/User"
import SubCategory, {
	NewSubCategoryInput,
	UpdateSubCategoryInput,
} from "../entities/SubCategory"

@Resolver()
class SubCategoryResolver {
	@Query(() => [SubCategory])
	async getAllSubCategories(
		@Arg("categoryId", () => Int, { nullable: true }) categoryId?: number,
		@Arg("name", { nullable: true }) name?: string
	) {
		return SubCategory.find({
			relations: { category: true },
			where: {
				name: name ? ILike(`%${name}%`) : undefined,
				category: {
					id: categoryId,
				},
			},
		})
	}

	@Query(() => SubCategory)
	async getSubCategoryById(@Arg("subCategoryId", () => Int) id: number) {
		const subCategory = await SubCategory.findOne({
			where: { id },
			relations: { category: true },
		})
		if (!subCategory) throw new GraphQLError("Not found")
		return subCategory
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => SubCategory)
	async createSubCategory(
		@Arg("data", { validate: true }) data: NewSubCategoryInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const newSubCategory = new SubCategory()

		if (ctx.currentUser.role !== UserRole.ADMIN)
			throw new GraphQLError("Not authorized")
		Object.assign(newSubCategory, data)

		const { id } = await newSubCategory.save()
		return SubCategory.findOne({
			where: { id },
			relations: { category: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => SubCategory)
	async updateSubCategory(
		@Arg("subCategoryId") id: number,
		@Arg("data", { validate: true }) data: UpdateSubCategoryInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const subCategoryToUpdate = await SubCategory.findOne({ where: { id } })
		if (!subCategoryToUpdate) throw new GraphQLError("Sub Category not found")

		if (ctx.currentUser.role !== UserRole.ADMIN)
			throw new GraphQLError("Not authorized")
		await Object.assign(subCategoryToUpdate, data)

		await subCategoryToUpdate.save()
		return SubCategory.findOne({
			where: { id },
			relations: { category: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => String)
	async deleteSubCategory(
		@Arg("subCategoryId") id: number,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const subCategoryToDelete = await SubCategory.findOne({ where: { id } })
		if (!subCategoryToDelete) throw new GraphQLError("Sub Category not found")

		if (ctx.currentUser.role !== UserRole.ADMIN)
			throw new GraphQLError("Not authorized")

		await subCategoryToDelete.remove()
		return "Sub Category deleted"
	}
}

export default SubCategoryResolver
