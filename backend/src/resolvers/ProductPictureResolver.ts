import { GraphQLError } from "graphql"
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import { NewProduct_pictureInput, Product_picture, UpdateProduct_pictureInput } from "../entities/ProductPicture"
import { UserRole } from "../entities/User"
import { Context } from "../utils"
import Product from "../entities/Product"

@Resolver()
class ProductPictureResolver {
	@Query(() => [Product_picture])
	async getAllProduct_pictures() {
		try {
			return await Product_picture.find({ relations: ["product"] })
		} catch (error) {
			console.error("Error fetching all product pictures:", error)
			throw new Error("Could not fetch product pictures")
		}
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Product_picture)
	async createProduct_picture(@Arg("data", { validate: true }) data: NewProduct_pictureInput, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		const product = await Product.findOne({ where: { id: data.productId.id } })
		if (!product) {
			throw new GraphQLError("Product not found")
		}
		const newProduct_picture = new Product_picture()
		newProduct_picture.thumbnail = data.thumbnail
		newProduct_picture.alt = data.alt
		newProduct_picture.product = product

		return newProduct_picture.save()
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Product_picture)
	async updateProduct_picture(
		@Arg("id", () => Int) id: number,
		@Arg("data", { validate: true }) data: UpdateProduct_pictureInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const productPicture = await Product_picture.findOne({ where: { id } })
		if (!productPicture) throw new GraphQLError("Product picture not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		Object.assign(productPicture, data)
		return productPicture.save()
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Boolean)
	async deleteProduct_picture(@Arg("id", () => Int) id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const productPicture = await Product_picture.findOne({ where: { id } })
		if (!productPicture) throw new GraphQLError("Product picture not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		await Product_picture.remove(productPicture)
		return true
	}
}

export default ProductPictureResolver
