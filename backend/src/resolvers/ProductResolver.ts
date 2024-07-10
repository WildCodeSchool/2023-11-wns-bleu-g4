import { GraphQLError } from "graphql"
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import { ILike } from "typeorm"
import { NewProductInput, Product, UpdateProductInput } from "../entities/Product"
import { UserRole } from "../entities/User"
import { SortProduct } from "../enum/SortProduct"
import { ProductList } from "../types"
import { Context } from "../utils"

@Resolver(Product)
export class ProductResolver {
	@Query(() => ProductList)
	async getAllProducts(
		@Arg("categoryId", () => Int, { nullable: true }) categoryId?: number,
		@Arg("name", { nullable: true }) name?: string,
		@Arg("sortOrder", () => SortProduct, { nullable: true }) sortProduct?: SortProduct,
		@Arg("limit", () => Int, { nullable: true }) limit?: number,
		@Arg("offset", () => Int, { nullable: true }) offset?: number
	): Promise<ProductList> {
		const whereOptions: any = {};

		if (categoryId) {
			whereOptions.category = { id: categoryId };
		}

		if (name) {
			whereOptions.name = ILike(`%${name}%`);
		}

		let orderOptions: any = {};

		if (sortProduct === SortProduct.ASC || sortProduct === SortProduct.DESC) {
			orderOptions.price = sortProduct;
		} else {
			orderOptions.id = "ASC";
		}

		const [products, total] = await Product.findAndCount({
			relations: {
				category: true,
				pictures: true,
				brand: true,
				characteristics: true,
				reviews: true,
			},
			where: whereOptions,
			order: orderOptions,
			take: limit,
			skip: offset,
		});

		return { products, total };
	}

	@Query(() => Product)
	async getProductById(@Arg("productId", () => Int) id: number) {
		const product = await Product.findOne({
			where: { id },
			relations: { category: true, reviews: true, pictures: true, brand: true, characteristics: true },
		})
		if (!product) throw new GraphQLError("Not found")
		return product
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Product)
	async createProduct(@Arg("data", { validate: true }) data: NewProductInput, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const newProduct = new Product()

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")
		Object.assign(newProduct, data)

		const { id } = await newProduct.save()
		return Product.findOne({
			where: { id },
			relations: { category: true, reviews: true, pictures: true, brand: true, characteristics: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Product)
	async updateProduct(
		@Arg("productId") id: number,
		@Arg("data", { validate: true }) data: UpdateProductInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const productToUpdate = await Product.findOne({ where: { id } })
		if (!productToUpdate) throw new GraphQLError("Product not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")
		await Object.assign(productToUpdate, data)

		await productToUpdate.save()
		return Product.findOne({
			where: { id },
			relations: { category: true, reviews: true, pictures: true, brand: true, characteristics: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => String)
	async deleteProduct(@Arg("productId") id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const productToDelete = await Product.findOne({ where: { id } })
		if (!productToDelete) throw new GraphQLError("Product not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		await productToDelete.remove()
		return "Product deleted"
	}
}

export default ProductResolver