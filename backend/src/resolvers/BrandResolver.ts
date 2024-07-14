import { GraphQLError } from "graphql"
import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql"
import Brand, { NewBrandInput, UpdateBrandInput } from "../entities/Brand"
import { UserRole } from "../entities/User"
import { BrandList } from "../types"

@Resolver(Brand)
class BrandResolver {
	@Query(() => BrandList)
	async getAllBrands(
		@Arg("limit", () => Int, { nullable: true }) limit?: number,
		@Arg("offset", () => Int, { nullable: true }) offset?: number
	) {
		const [brands, total] = await Brand.findAndCount({
			take: limit,
			skip: offset,
			relations: { product: true },
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
	async createBrand(@Arg("data") data: NewBrandInput) {
		const newBrand = new Brand()
		Object.assign(newBrand, data)
		await newBrand.save()
		return newBrand
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Brand)
	async updateBrand(@Arg("brandId", () => Int) id: number, @Arg("data") data?: UpdateBrandInput) {
		const brand = await Brand.findOne({ where: { id }, relations: { product: true } })
		if (!brand) throw new GraphQLError("Brand not found")
		Object.assign(brand, data)
		await brand.save()
		return Brand.findOne({ where: { id } })
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Boolean)
	async deleteBrand(@Arg("brandId", () => Int) id: number) {
		const brand =
			(await Brand.findOne({ where: { id } })) ||
			(() => {
				throw new GraphQLError("Brand not found")
			})()
		await brand.remove()
		return true
	}
}

export default BrandResolver
