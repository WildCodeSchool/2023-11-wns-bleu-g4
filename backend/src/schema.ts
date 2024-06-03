import { buildSchema } from "type-graphql"
import { authChecker } from "./auth"
import UserResolver from "./resolvers/UserResolver"
import ProductResolver from "./resolvers/ProductResolver"
import { ReviewResolver } from "./resolvers/ReviewResolver"
import SubCategoryResolver from "./resolvers/SubCategoryResolver"
import CategoryResolver from "./resolvers/CategoryResolver"
import AgencyResolver from "./resolvers/AgencyResolver"

export default buildSchema({
	resolvers: [
		CategoryResolver,
		ProductResolver,
		ReviewResolver,
		SubCategoryResolver,
		UserResolver,
		AgencyResolver
	],
	authChecker,
})
