import { buildSchema } from "type-graphql"
import { authChecker } from "./auth"
import UserResolver from "./resolvers/UserResolver"

export default buildSchema({
	resolvers: [UserResolver],
	authChecker,
})
