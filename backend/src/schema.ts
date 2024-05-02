import { buildSchema } from "type-graphql"
import { authChecker } from "./auth"
import UserResolver from "./resolvers/UserResolver"
import ProductResolver from "./resolvers/ProductResolver"
import { ReviewResolver } from "./resolvers/ReviewResolver"
import SubCategoryResolver from "./resolvers/SubCategoryResolver"

export default buildSchema({
	resolvers: [
		UserResolver,
		ReviewResolver,
		ProductResolver,
		SubCategoryResolver,
	],
	authChecker,
})
