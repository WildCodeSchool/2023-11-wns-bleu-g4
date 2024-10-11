import User, { UserRole } from "../../../src/entities/User"

export default async function createUsers(qty: number) {
	for (let i = 1; i <= qty; i++) {
		const customer = new User()
		Object.assign(customer, {
			name: `Adebayo${i}`,
			firstname: `Segun${i}`,
			address: "123 Rue de Paris",
			postcode: "75000",
			city: "Paris",
			country: "France",
			phone: `+3361234567${i}`,
			email: `customer${i}@gmail.com`,
			password: `Customer42${i}@!`,
			role: UserRole.CUSTOMER,
			emailVerified: true,
		})
		await customer.save()
	}
}
