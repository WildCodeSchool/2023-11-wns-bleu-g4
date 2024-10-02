import jwt from "jsonwebtoken"
import User, { UserRole } from "../../src/entities/User"
import env from "../../src/env"

export default async function () {
	const admin = new User()
	Object.assign(admin, {
		nickname: "admin",
		email: "geargo.wild@gmail.com",
		password: "4dminAdmin@!",
		role: UserRole.ADMIN,
		emailVerified: true,
	})
	await admin.save()
	const JWT = jwt.sign({ userId: admin.id, role: admin.role }, env.JWT_PRIVATE_KEY)

	return { JWT, admin }
}
