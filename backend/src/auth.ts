import cookie from "cookie"
import jwt from "jsonwebtoken"
import { AuthChecker } from "type-graphql"
import User from "./entities/User"
import env from "./env"
import { Context } from "./utils"

export const authChecker: AuthChecker<Context> = async (
	{ context },
	roles: string[] = []
) => {
	const { headers } = context.req
	const tokenInCookie = cookie.parse(headers.cookie ?? "").token
	const tokenInAuthHeaders = headers.authorization?.split(" ")[1]

	const token = tokenInAuthHeaders ?? tokenInCookie
	if (typeof token !== "string") return false

	const decoded = jwt.verify(await token, env.JWT_PRIVATE_KEY!) as any
	if (!decoded?.userId) return false

	const currentUser = await User.findOneByOrFail({ id: decoded?.userId })
	if (currentUser === null) return false

	context.currentUser = currentUser
	return roles.length === 0 || roles.includes(currentUser.role)
}
