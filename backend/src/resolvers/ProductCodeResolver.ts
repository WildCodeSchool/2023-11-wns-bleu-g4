import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import { NewProductCodeInput, ProductCode } from "../entities/ProductCode"
import { Status } from "../enum/StatusProductCode"
import { ProductCodeList } from "../types"
import { Context } from "../utils"
import { GraphQLError } from "graphql"
import { UserRole } from "../entities/User"
import Product from "../entities/Product"
import Agency from "../entities/Agency"
import { DataSource, In } from "typeorm"
import db from "../db"

@Resolver()
class ProductCodeResolver {
	@Query(() => [ProductCode])
	async getAllProduct_codes() {
		try {
			return await ProductCode.find({ relations: ["product", "agency"] })
		} catch (error) {
			console.error("Error fetching all product codes:", error)
			throw new Error("Could not fetch product codes")
		}
	}

	@Query(() => ProductCodeList)
	async getProductCodesByProductId(
		@Arg("productId", () => Int) productId: number,
		@Arg("limit", () => Int, { nullable: true }) limit?: number,
		@Arg("offset", () => Int, { nullable: true }) offset?: number
	) {
		const [productCodes, total] = await ProductCode.findAndCount({
			where: { product: { id: productId } },
			take: limit,
			skip: offset,
			relations: { product: true, agency: true },
		})
		return { productCodes, total }
	}

	@Query(() => [ProductCode])
	async getProductCodesByStatus(@Arg("status", () => Status) status: Status) {
		try {
			return await ProductCode.find({
				where: { status },
				relations: ["product", "agency"],
			})
		} catch (error) {
			console.error(`Error fetching product codes with status ${status}:`, error)
			throw new Error("Could not fetch product codes by status")
		}
	}

	@Query(() => Boolean)
	async checkProductAvailability(
		@Arg("agencyId", () => Int) agencyId: number,
		@Arg("productId", () => Int) productId: number,
		@Arg("startDate", () => Date) startDate: Date,
		@Arg("endDate", () => Date) endDate: Date,
		@Arg("quantity", () => Int) quantity: number,
		@Arg("size", () => String, { nullable: true }) size?: string | number
	): Promise<boolean> {
		try {
			const availableProductCodes = await ProductCode.checkAvailability(productId, startDate, endDate, quantity, size)

			return availableProductCodes !== null
		} catch (error) {
			console.error(`Error checking product availability for agency ${agencyId}:`, error)
			throw new Error("Could not check product availability")
		}
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => [ProductCode])
	async createProductCode(
		@Arg("data", { validate: true }) data: NewProductCodeInput,
		@Arg("quantity", () => Int) quantity: number,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		const product = await Product.findOne({ where: { id: data.productId } })
		if (!product) throw new GraphQLError(`Product with ID ${data.productId} not found`)

		const agency = await Agency.findOne({ where: { id: data.agencyId } })
		if (!agency) throw new GraphQLError(`Agency with ID ${data.agencyId} not found`)

		const productCodes: ProductCode[] = []
		const dataSource = db

		await dataSource.transaction(async (transactionalEntityManager) => {
			for (let i = 0; i < quantity; i++) {
				const productCode = ProductCode.create({
					status: Status.AVAILABLE,
					product: product,
					agency: agency,
					isSizeable: data.isSizeable,
					size: data.size,
				})

				const savedProductCode = await transactionalEntityManager.save(productCode)
				productCodes.push(savedProductCode)
			}
		})

		return ProductCode.find({
			where: { id: In(productCodes.map((pc) => pc.id)) },
			relations: { product: true, agency: true },
		})
	}
}

export default ProductCodeResolver
