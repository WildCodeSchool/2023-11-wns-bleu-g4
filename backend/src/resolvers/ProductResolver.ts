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
import {
	NewProductInput,
	Product,
	UpdateProductInput,
} from "../entities/Product"

@Resolver(Product)
class ProductResolver {
	@Query(() => [Product])
	async products(
		@Arg("categoryId", () => Int, { nullable: true }) categoryId?: number,
		@Arg("name", { nullable: true }) name?: string
	) {
		return Product.find({
			relations: { categories: true },
			where: {
				name: name ? ILike(`%${name}%`) : undefined,
				categories: {
					id: categoryId,
				},
			},
		})
	}

	@Query(() => Product)
	async getProductById(@Arg("productId", () => Int) id: number) {
		const product = await Product.findOne({
			where: { id },
			relations: { categories: true, reviews: true },
		})
		if (!product) throw new GraphQLError("Not found")
		return product
	}

	@Authorized()
	@Mutation(() => Product)
	async createProduct(
		@Arg("data", { validate: true }) data: NewProductInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const newProduct = new Product()
		Object.assign(newProduct, data)
		const { id } = await newProduct.save()
		return Product.findOne({
			where: { id },
			relations: { categories: true, reviews: true },
		})
	}

	@Authorized()
	@Mutation(() => Product)
	async updateProduct(
		@Arg("productId") id: number,
		@Arg("data", { validate: true }) data: UpdateProductInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const productToUpdate = await Product.findOne({ where: { id } })
		if (!productToUpdate) throw new GraphQLError("Product not found")

		if (ctx.currentUser.role !== UserRole.ADMIN)
			throw new GraphQLError("Not authorized")
		await Object.assign(productToUpdate, data)

		await productToUpdate.save()
		return Product.findOne({
			where: { id },
			relations: { categories: true, reviews: true },
		})
	}

	@Authorized()
	@Mutation(() => String)
	async deleteProduct(@Arg("productId") id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const productToDelete = await Product.findOne({ where: { id } })
		if (!productToDelete) throw new GraphQLError("Product not found")

		if (ctx.currentUser.role !== UserRole.ADMIN)
			throw new GraphQLError("Not authorized")

		await productToDelete.remove()
		return "Product deleted"
	}
}

export default ProductResolver
