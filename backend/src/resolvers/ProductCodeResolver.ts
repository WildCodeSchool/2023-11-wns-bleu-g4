import { Arg, Query, Resolver } from "type-graphql";
import { ProductCode } from "../entities/ProductCode";
import { Status } from "../enum/StatusProductCode";

@Resolver()
class ProductCodeResolver {

  @Query(() => [ProductCode])
  async getAllProduct_codes() {
    try {
      return await ProductCode.find({ relations: ["product", "agency"] });
    } catch (error) {
      console.error("Error fetching all product codes:", error);
      throw new Error("Could not fetch product codes");
    }
  }

  @Query(() => [ProductCode])
  async getProductCodesByStatus(@Arg("status", () => Status) status: Status) {
    try {
      return await ProductCode.find({
        where: { status },
        relations: ["product", "agency"]
      });
    } catch (error) {
      console.error(`Error fetching product codes with status ${status}:`, error);
      throw new Error("Could not fetch product codes by status");
    }
  }
}

export default ProductCodeResolver;