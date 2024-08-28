import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import {ProductCode} from "../entities/ProductCode";
import {Status} from "../enum/StatusProductCode";
import { GraphQLError } from "graphql";

@Resolver()
class ProductCodeResolver {

    @Query(() => [ProductCode])
    async getAllProduct_codes() {
        try {
            return await ProductCode.find({relations: ["product", "agency"]});
        } catch (error) {
            console.error("Error fetching all product codes:", error);
            throw new Error("Could not fetch product codes");
        }
    }

    @Query(() => [ProductCode])
    async getProductCodesByStatus(@Arg("status", () => Status) status: Status) {
        try {
            return await ProductCode.find({
                where: {status},
                relations: ["product", "agency"]
            });
        } catch (error) {
            console.error(`Error fetching product codes with status ${status}:`, error);
            throw new Error("Could not fetch product codes by status");
        }
    }

    @Query(() => Boolean)
    async checkProductAvailability(
        @Arg("agencyId", () => Int) agencyId: number,
        @Arg("productId", () => Int) productId: number,
        @Arg("startDate", () => Date) startDate: Date,
        @Arg("endDate", () => Date) endDate: Date,
        @Arg("quantity", () => Int) quantity: number,
        @Arg("size", () => String, {nullable: true}) size?: string | number
    ): Promise<boolean> {
        try {
            const availableProductCodes = await ProductCode.checkAvailability(productId, startDate, endDate, quantity, size);

            return availableProductCodes !== null;
        } catch (error) {
            console.error(`Error checking product availability for agency ${agencyId}:`, error);
            throw new Error("Could not check product availability");
        }
    }
}

export default ProductCodeResolver;