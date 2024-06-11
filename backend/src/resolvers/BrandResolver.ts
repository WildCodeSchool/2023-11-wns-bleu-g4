import { GraphQLError } from "graphql"
import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql"
import Brand, { NewBrandInput, UpdateBrandInput } from "../entities/Brand"
import { UserRole } from "../entities/User"

@Resolver(Brand)
class BrandResolver {
	@Query(() => [Brand])
	async getAllBrands() {
		return Brand.find({ relations: { product: true } })
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
	async updateBrand(
		@Arg("brandId", () => Int) id: number,
		@Arg("data") data?: UpdateBrandInput
	) {
		const brand = await Brand.findOne({ where: { id }, relations: {product:true} })
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
