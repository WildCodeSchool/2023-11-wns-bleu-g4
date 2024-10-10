import Agency from "../../../src/entities/Agency"

export default async function createAgencies(qty: number) {
	for (let i = 0; i < qty; i++) {
		const number = i + 1
		await Agency.create({
			id: number,
			name: "agency" + number,
			address: "address" + number,
			postcode: "postcode" + number,
			city: "city" + number,
			country: "country" + number,
			phone: "phone" + number,
			email: "email" + number,
		}).save()
	}
}