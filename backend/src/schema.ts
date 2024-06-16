import { buildSchema } from "type-graphql"
import { authChecker } from "./auth"
import AgencyResolver from "./resolvers/AgencyResolver"
import BookingResolver from "./resolvers/BookingResolver"
import BrandResolver from "./resolvers/BrandResolver"
import CategoryResolver from "./resolvers/CategoryResolver"
import ProductResolver from "./resolvers/ProductResolver"
import ProductCodeResolver from "./resolvers/ProductCodeResolver"
import ProductPictureResolver from "./resolvers/ProductPictureResolver"
import { ReviewResolver } from "./resolvers/ReviewResolver"
import ParentCategoryResolver from "./resolvers/ParentCategoryResolver"
import BookingItemResolver from "./resolvers/BookingItemResolver"
import UserResolver from "./resolvers/UserResolver"

export default buildSchema({
	resolvers: [
		CategoryResolver,
		ProductResolver,
		ReviewResolver,
		ParentCategoryResolver,
		UserResolver,
		AgencyResolver,
		ProductCodeResolver,
		BookingItemResolver,
		ProductPictureResolver,
		BookingResolver,
		BrandResolver,
	],
	authChecker,
})