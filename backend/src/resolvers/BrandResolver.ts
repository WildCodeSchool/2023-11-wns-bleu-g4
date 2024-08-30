import { GraphQLError } from "graphql"
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import Brand, { NewBrandInput, UpdateBrandInput } from "../entities/Brand"
import { UserRole } from "../entities/User"
import { BrandList } from "../types"
import { ILike } from "typeorm"
import { Context } from "../utils"

@Resolver(Brand)
class BrandResolver {
	@Query(() => BrandList)
	async getAllBrands(
		@Arg("limit", () => Int, { nullable: true }) limit?: number,
		@Arg("offset", () => Int, { nullable: true }) offset?: number,
		@Arg("name", () => String, { nullable: true }) name?: string
	) {
		const [brands, total] = await Brand.findAndCount({
			take: limit,
			skip: offset,
			relations: { product: true },
			where: name ? { name: ILike(`%${name}%`) } : {},
		})
		return { brands, total }
	}

	@Query(() => Brand)
	async getBrandById(@Arg("brandId", () => Int) id: number) {
		const brand = await Brand.findOne({
			where: { id },
			relations: { product: true },
		})
		if (!brand) throw new GraphQLError("Not found")
		return brand
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Brand)
	async createBrand(@Arg("data") data: NewBrandInput, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")
		const newBrand = new Brand()

		Object.assign(newBrand, data)
		const { id } = await newBrand.save()
		return Brand.findOne({
			where: { id },
			relations: { product: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Brand)
	async updateBrand(
		@Arg("brandId", () => Int) id: number,
		@Arg("data", { validate: true }) data: UpdateBrandInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		const brandToUpdate = await Brand.findOne({ where: { id } })
		if (!brandToUpdate) throw new GraphQLError("Brand not found")

		await Object.assign(brandToUpdate, data)

		await brandToUpdate.save()
		return Brand.findOne({
			where: { id },
			relations: { product: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Boolean)
	async deleteBrand(@Arg("brandId", () => Int) id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")
		const brandToDelete = await Brand.findOne({ where: { id } })
		if (!brandToDelete) throw new GraphQLError("Brand not found")

		await brandToDelete.remove()
		return true
	}
}

export default BrandResolver
