import { GraphQLError } from "graphql"
import {
	Arg,
	Authorized,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
} from "type-graphql"
import { ILike } from "typeorm"
import ParentCategory, {
	NewParentCategoryInput,
	UpdateParentCategoryInput,
} from "../entities/ParentCategory"
import { UserRole } from "../entities/User"
import { Context } from "../utils"

@Resolver()
class ParentCategoryResolver {
	@Query(() => [ParentCategory])
	async getAllParentCategories(
		@Arg("categoryId", () => Int, { nullable: true }) categoryId?: number,
		@Arg("name", { nullable: true }) name?: string
	) {
		return ParentCategory.find({
			where: {
				name: name ? ILike(`'%${name}%'`) : undefined,
				categories: { id: categoryId },
			},
			relations: { categories: true },
		});
	}

	@Query(() => ParentCategory)
	async getParentCategoryById(@Arg("parentCategoryId", () => Int) id: number) {
		const parentCategory = await ParentCategory.findOne({
			where: { id },
		})
		if (!parentCategory) throw new GraphQLError("Not found")
		return parentCategory
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => ParentCategory)
	async createParentCategory(
		@Arg("data", { validate: true }) data: NewParentCategoryInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const newParentCategory = new ParentCategory()

		if (ctx.currentUser.role !== UserRole.ADMIN)
			throw new GraphQLError("Not authorized")
		Object.assign(newParentCategory, data)

		const { id } = await newParentCategory.save()
		return ParentCategory.findOne({
			where: { id },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => ParentCategory)
	async updateParentCategory(
		@Arg("parentCategoryId") id: number,
		@Arg("data", { validate: true }) data: UpdateParentCategoryInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const parentCategoryToUpdate = await ParentCategory.findOne({ where: { id } })
		if (!parentCategoryToUpdate) throw new GraphQLError("Parent Category not found")

		if (ctx.currentUser.role !== UserRole.ADMIN)
			throw new GraphQLError("Not authorized")
		await Object.assign(parentCategoryToUpdate, data)

		await parentCategoryToUpdate.save()
		return ParentCategory.findOne({
			where: { id }
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => String)
	async deleteParentCategory(
		@Arg("parentCategoryId") id: number,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const parentCategoryToDelete = await ParentCategory.findOne({ where: { id } })
		if (!parentCategoryToDelete) throw new GraphQLError("Parent Category not found")

		if (ctx.currentUser.role !== UserRole.ADMIN)
			throw new GraphQLError("Not authorized")

		await parentCategoryToDelete.remove()
		return "Parent Category deleted"
	}
}

export default ParentCategoryResolver
