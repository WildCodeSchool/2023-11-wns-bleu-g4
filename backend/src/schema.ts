import { buildSchema } from "type-graphql"
import { authChecker } from "./auth"
import AgencyResolver from "./resolvers/AgencyResolver"
import BookingResolver from "./resolvers/BookingResolver"
import BrandResolver from "./resolvers/BrandResolver"
import CategoryResolver from "./resolvers/CategoryResolver"
import ProductResolver from "./resolvers/ProductResolver"
import Product_codeResolver from "./resolvers/Product_codeResolver"
import Product_pictureResolver from "./resolvers/Product_pictureResolver"
import { ReviewResolver } from "./resolvers/ReviewResolver"
import SubCategoryResolver from "./resolvers/ParentCategoryResolver"
import BookingItemResolver from "./resolvers/BookingItemResolver"
import UserResolver from "./resolvers/UserResolver"

export default buildSchema({
	resolvers: [
		CategoryResolver,
		ProductResolver,
		ReviewResolver,
		SubCategoryResolver,
		UserResolver,
		AgencyResolver,
		Product_codeResolver,
		BookingItemResolver,
		Product_pictureResolver,
		BookingResolver,
		BrandResolver,
	],
	authChecker,
})
