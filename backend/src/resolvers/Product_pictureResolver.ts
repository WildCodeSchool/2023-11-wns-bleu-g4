import { Query, Resolver } from "type-graphql"
import { Product_picture } from "../entities/Product_picture"

@Resolver()
class Product_pictureResolver {
	@Query(() => [Product_picture])
	async getAllProduct_pictures() {
		try {
			return await Product_picture.find({ relations: ["product"] })
		} catch (error) {
			console.error("Error fetching all product pictures:", error)
			throw new Error("Could not fetch product pictures")
		}
	}
}

export default Product_pictureResolver
