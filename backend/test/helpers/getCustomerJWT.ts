import jwt from "jsonwebtoken"
import User, { UserRole } from "../../src/entities/User"
import env from "../../src/env"

export default async function () {
	const user = new User()
	Object.assign(user, {
		nickname: "admin",
		email: "geargo.wild@gmail.com",
		password: "4dminAdmin@!",
		role: UserRole.CUSTOMER,
		emailVerified: true,
	})
	await user.save()
	const JWT = jwt.sign({ userId: user.id, role: user.role }, env.JWT_PRIVATE_KEY)

	return { JWT, user }
}
