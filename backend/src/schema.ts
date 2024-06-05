import { buildSchema } from "type-graphql"
import { authChecker } from "./auth"
import AgencyResolver from "./resolvers/AgencyResolver"
import CategoryResolver from "./resolvers/CategoryResolver"
import ProductResolver from "./resolvers/ProductResolver"
import Product_codeResolver from "./resolvers/Product_codeResolver"
import Product_pictureResolver from "./resolvers/Product_pictureResolver"
import { ReviewResolver } from "./resolvers/ReviewResolver"
import SubCategoryResolver from "./resolvers/SubCategoryResolver"
import UserResolver from "./resolvers/UserResolver"
import BookingResolver from "./resolvers/BookingResolver"

export default buildSchema({
	resolvers: [
		CategoryResolver,
		ProductResolver,
		ReviewResolver,
		SubCategoryResolver,
		UserResolver,
		AgencyResolver,
		Product_codeResolver,
		Product_pictureResolver,
		BookingResolver
	],
	authChecker,
})
