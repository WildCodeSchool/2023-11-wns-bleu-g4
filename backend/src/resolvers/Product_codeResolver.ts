import { Arg, Query, Resolver } from "type-graphql";
import { Product_code } from "../entities/Product_code";
import { Status } from "../enum/Status";

@Resolver()
class Product_codeResolver {

  // Query to get all product codes with their associated product and agency
  @Query(() => [Product_code])
  async getAllProduct_codes() {
    try {
      return await Product_code.find({ relations: ["product", "agency"] });
    } catch (error) {
      console.error("Error fetching all product codes:", error);
      throw new Error("Could not fetch product codes");
    }
  }

  // Query to get product codes by status with related product and agency
  @Query(() => [Product_code])
  async getProductCodesByStatus(@Arg("status", () => Status) status: Status) {
    try {
      return await Product_code.find({ 
        where: { status },
        relations: ["product", "agency"]
      });
    } catch (error) {
      console.error(`Error fetching product codes with status ${status}:`, error);
      throw new Error("Could not fetch product codes by status");
    }
  }
}

export default Product_codeResolver;
