import { buildSchema } from "type-graphql"
import { authChecker } from "./auth"
import UserResolver from "./resolvers/UserResolver"
import ProductResolver from "./resolvers/ProductResolver"
import { ReviewResolver } from "./resolvers/ReviewResolver"

export default buildSchema({
	resolvers: [UserResolver, ProductResolver, ReviewResolver],
	authChecker,
})
