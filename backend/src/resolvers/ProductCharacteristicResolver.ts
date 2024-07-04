import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import ProductCharacteristic, { newProductCharacteristicInput } from "../entities/ProductCharacteristic";
import { UserRole } from "../entities/User";
import { Context } from "../utils";
import { GraphQLError } from "graphql";

@Resolver()
class ProductCharacteristicResolver {

    @Query(() => [ProductCharacteristic])
    async getAllProductCharacteristics() {
        try {
            return await ProductCharacteristic.find({ relations: ["product"] });
        } catch (error) {
            console.error("Error fetching all product characteristics:", error);
            throw new Error("Could not fetch product characteristics");
        }
    }

    @Query(() => [ProductCharacteristic])
    async getProductCharacteristicsById(@Arg("id", () => Int) id: number) {
        try {
            return await ProductCharacteristic.find({
                where: { id },
                relations: ["product"]
            });
        } catch (error) {
            console.error(`Error fetching product characteristics with id ${id}:`, error);
            throw new Error("Could not fetch product characteristics by id");
        }
    }

    @Query(() => [ProductCharacteristic])
    async getProductCharacteristicsByProductId(@Arg("productId", () => Int) productId: number) {
        try {
            return await ProductCharacteristic.find({
                where: { product: { id: productId } },
                relations: ["product"]
            });
        } catch (error) {
            console.error(`Error fetching product characteristics with productId ${productId}:`, error);
            throw new Error("Could not fetch product characteristics by productId");
        }
    }

    @Authorized([UserRole.ADMIN])
    @Mutation(() => ProductCharacteristic)
    async createProductCharacteristic(
        @Arg("data", { validate: true }) data: newProductCharacteristicInput,
        @Ctx() ctx: Context
    ) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
        if (ctx.currentUser.role !== UserRole.ADMIN)
            throw new GraphQLError("Not authorized")

        const newProductCharacteristic = ProductCharacteristic.create(data)
        return newProductCharacteristic.save()
    }

    @Authorized([UserRole.ADMIN])
    @Mutation(() => ProductCharacteristic)
    async updateProductCharacteristic(
        @Arg("id") id: number,
        @Arg("data", { validate: true }) data: newProductCharacteristicInput,
        @Ctx() ctx: Context
    ) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
        const productCharacteristicToUpdate = await ProductCharacteristic.findOne({ where: { id } })
        if (!productCharacteristicToUpdate) throw new GraphQLError("Product characteristic not found")

        if (ctx.currentUser.role !== UserRole.ADMIN)
            throw new GraphQLError("Not authorized")
        Object.assign(productCharacteristicToUpdate, data)

        const { id: updatedId } = await productCharacteristicToUpdate.save()
        return ProductCharacteristic.findOne({
            where: { id: updatedId },
        })
    }
}

export default ProductCharacteristicResolver