import jwt from "jsonwebtoken"
import User, { UserRole } from "../../src/entities/User"
import env from "../../src/env"

export default async function () {
	const customer = new User()
	Object.assign(customer, {
		nickname: "customer",
		email: "customer@gmail.com",
		password: "Customer42@!",
		role: UserRole.CUSTOMER,
		emailVerified: true,
	})
	await customer.save()
	const JWT = jwt.sign({ userId: customer.id, role: customer.role }, env.JWT_PRIVATE_KEY)

	return { JWT, customer }
}
