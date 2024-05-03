import db from "./db"
import Agency from "./entities/Agency"
import User, { UserRole } from "./entities/User"

export async function clearDB() {
	const runner = db.createQueryRunner()
	await runner.query("SET session_replication_role = 'replica'")
	await Promise.all(
		db.entityMetadatas.map(async (entity) =>
			runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`)
		)
	)
	await Promise.all(
		db.entityMetadatas.map(async (entity) =>
			runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
		)
	)
	await runner.query("SET session_replication_role = 'origin'")
	await db.synchronize()
}

async function main() {
	await db.initialize()
	await clearDB()

	const admin = new User()
	Object.assign(admin, {
		name: "Super",
		firstname: "Admin",
		address: "123 Rue de GearGo",
		postcode: "75000",
		city: "Paris",
		country: "France",
		phone: "+33612345678",
		email: "support@geargo.fr",
		password: "4dminAdmin@!",
		role: UserRole.ADMIN,
		emailVerified: true,
	})
	await admin.save()

	const customer = new User()
	Object.assign(customer, {
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
	await customer.save()

	const agency = new Agency()
	Object.assign(agency, {
		name: "GearGo Capitol",
		address: "31, rue de la Chocolatine",
		zipcode: 31330,
		city: "Toulouse",
		country: "France",
		phone: "0504030201",
		email: "geargo.wild@gmail.com",
	})
	await agency.save()

	await db.destroy()
	console.log("Done !")
}

main()
