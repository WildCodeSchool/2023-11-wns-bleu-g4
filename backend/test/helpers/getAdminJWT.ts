import jwt from "jsonwebtoken"
import User, { UserRole } from "../../src/entities/User"
import env from "../../src/env"

export default async function () {
	const admin = new User()
	Object.assign(admin, {
		name: "Super",
		firstname: "Admin",
		address: "123 Rue de GearGo",
		postcode: "75000",
		city: "Paris",
		country: "France",
		phone: "+33612345678",
		email: "geargo.wild@gmail.com",
		password: "4dminAdmin@!",
		role: UserRole.ADMIN,
		emailVerified: true,
	})
	await admin.save()
	const JWT = jwt.sign({ userId: admin.id, role: admin.role }, env.JWT_PRIVATE_KEY)

	return { JWT, admin }
}
