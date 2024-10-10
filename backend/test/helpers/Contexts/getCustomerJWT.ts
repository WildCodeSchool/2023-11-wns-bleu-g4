import jwt from "jsonwebtoken"
import User, { UserRole } from "../../../src/entities/User"
import env from "../../../src/env"

export default async function () {
	const user = new User()
	Object.assign(user, {
		name: "Adebayo",
		firstname: "Segun",
		address: "123 Rue de Paris",
		postcode: "75000",
		city: "Paris",
		country: "France",
		phone: "+33612345678",
		email: "customer@gmail.com",
		password: "Customer42@!",
		role: UserRole.CUSTOMER,
		emailVerified: true,
	})
	await user.save()
	const JWT = jwt.sign({ userId: user.id, role: user.role }, env.JWT_PRIVATE_KEY)

	return { JWT, user }
}
