import db from "./db"
import Agency from "./entities/Agency"
import Category from "./entities/Category"
import Product from "./entities/Product"
import Product_code from "./entities/Product_code"
import Product_picture from "./entities/Product_picture"
import { Booking } from "./entities/Booking"
import User, { UserRole } from "./entities/User"
import { Status } from "./enum/Status"

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
		postcode: "31330",
		city: "Toulouse",
		country: "France",
		phone: "0504030201",
		email: "geargo.wild@gmail.com",
	})
	await agency.save()

	const product = new Product()
	Object.assign(product, {
		name: "Bike",
		price: 99.99,
		description: "A super bike for your daily commute.",
		brand: "Trekk",
		thumbnail: "thumbnail.jpg",
		categories: [],
	})
	await product.save()

	const category = new Category()
	Object.assign(category, {
		name: "Mountain",
		product: product,
	})
	await category.save()

	const productCode = new Product_code()
	Object.assign(productCode, {
		status: Status.AVAILABLE,
		product: product,
		agency: agency,
	})
	await productCode.save()

	const productPicture = new Product_picture()
	Object.assign(productPicture, {
		thumbnail: "thumbnail.jpg",
		alt: "Bike thumbnail",
		product: product,
	})
	await productPicture.save()

	const booking = new Booking()
	Object.assign(booking, {
		bookingDate: "2024-06-04T10:15:30.000Z",
		endDate: "2024-06-15T19:00:00.000Z",
		invoice: "INV-20240604-1",
		startDate: "2024-06-08T08:00:00.000Z",
		status: "RETREIVED",
		agency: {
			id: 1
		},
		user: {
			id: 1
		}
	})
	await booking.save()

	await db.destroy()
	console.log("Done !")
}

main()
