import db from "./db"
import Agency from "./entities/Agency"
import { Booking } from "./entities/Booking"
import { BookingItem } from "./entities/BookingItem"
import Brand from "./entities/Brand"
import Category from "./entities/Category"
import ParentCategory from "./entities/ParentCategory"
import Product from "./entities/Product"
import ProductCharacteristic from "./entities/ProductCharacteristic"
import ProductCode from "./entities/ProductCode"
import Product_picture from "./entities/ProductPicture"
import Review from "./entities/Review"
import User, { UserRole } from "./entities/User"
import { BookingItemStatus } from "./enum/BookingItemStatus"
import { StatusBooking } from "./enum/StatusBooking"
import { Status } from "./enum/StatusProductCode"
import { ParentCategoryId } from "./types"

export async function clearDB() {
	const runner = db.createQueryRunner()
	await runner.query("SET session_replication_role = 'replica'")
	await Promise.all(
		db.entityMetadatas.map(async (entity) => runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`))
	)
	await Promise.all(
		db.entityMetadatas.map(async (entity) => runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`))
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

	const brand = new Brand()
	Object.assign(brand, {
		name: "Trek",
		logo: "https://rad-protection.com/wp-content/uploads/2024/02/logo-trek-velo-1024x1024.png",
	})
	await brand.save()

	const parentCategoriesData = [{ name: "Sea" }, { name: "Mountain" }, { name: "Outdoor" }]

	const parentCategories: ParentCategory[] = []
	for (const data of parentCategoriesData) {
		const parentCategory = new ParentCategory()
		Object.assign(parentCategory, data)
		await parentCategory.save()
		parentCategories.push(parentCategory)
	}

	const categoriesData = [
		{
			name: "Ski",
			thumbnail: "https://th.bing.com/th/id/OIG4..XH1mFIzcBtwc7Q9D0QB?pid=ImgGn",
			parentCategory: {
				id: 2,
			},
		},
		{
			name: "Hiking",
			thumbnail: "https://th.bing.com/th/id/OIG2.l7kj9Z2mTO5_Gz3v9Iwh?pid=ImgGn",
			parentCategory: {
				id: 2,
			},
		},
		{
			name: "Surf",
			thumbnail: "https://th.bing.com/th/id/OIG4.uYJ5dzA5QRNUQpKs2M6C?pid=ImgGn",
			parentCategory: {
				id: 1,
			},
		},
		{
			name: "Kayak",
			thumbnail: "https://th.bing.com/th/id/OIG1.18PiGgR1RV5M8MGIZQwL?w=1024&h=1024&rs=1&pid=ImgDetMain",
			parentCategory: {
				id: 3,
			},
		},
		{
			name: "Bike",
			thumbnail: "https://th.bing.com/th/id/OIG1.sjNZrtr0ej1zIZYg8Qfj?w=1024&h=1024&rs=1&pid=ImgDetMain",
			parentCategory: {
				id: 3,
			},
		},
		{
			name: "Climb",
			thumbnail: "https://th.bing.com/th/id/OIG4.u..X.ZYjB97pShHvNpd1?w=1024&h=1024&rs=1&pid=ImgDetMain",
			parentCategory: {
				id: 3,
			},
		},
		{
			name: "Diving",
			thumbnail: "https://th.bing.com/th/id/OIG1._6LtzzEAl9bYoHop6oGn?w=1024&h=1024&rs=1&pid=ImgDetMain",
			parentCategory: {
				id: 1,
			},
		},
		{
			name: "Snow",
			thumbnail: "https://th.bing.com/th/id/OIG2.QO30WghDKzBT0YcvaovI?pid=ImgGn",
			parentCategory: {
				id: 2,
			},
		},
	]

	const categories: Category[] = []
	for (const data of categoriesData) {
		const category = new Category()
		const parentCategory = parentCategories.find((pc) => pc.id === data.parentCategory.id)
		Object.assign(category, {
			name: data.name,
			thumbnail: data.thumbnail,
			parentCategory: parentCategory,
		})
		await category.save()
		categories.push(category)
	}

	const product = new Product()
	Object.assign(product, {
		name: "Bike Trek Rail 5 Deore 2024",
		price: 99.99,
		description:
			"A super bike for your daily commute, with a powerful motor and a comfortable saddle. Perfect for long rides in the city or in the countryside.",
		thumbnail: "https://media.trekbikes.com/image/upload/w_1200/Rail5Deore_23_36791_A_Portrait",
		category: categories[0],
		brand,
		characteristics: [],
	})

	const characteristics = [
		"Suspension hydraulique",
		"Moteur 10W",
		"Guidon renforcé",
		"Freins à disque",
		"Pneus anti-crevaison",
		"Selle confortable",
		"Éclairage LED",
		"Antivol intégré",
		"Porte-bagages",
		"Garde-boue",
	]

	for (const characteristic of characteristics) {
		const productCharacteristic = new ProductCharacteristic()
		productCharacteristic.name = characteristic
		await productCharacteristic.save()
		product.characteristics.push(productCharacteristic)
	}

	await product.save()

	const productCode = new ProductCode()
	Object.assign(productCode, {
		status: Status.AVAILABLE,
		product,
		agency,
		isSizeable: true,
		size: "M",
	})
	await productCode.save()

	const productPictures = [
		{
			thumbnail: "https://media.trekbikes.com/image/upload/w_1200/Rail5Deore_23_36791_A_Portrait",
			alt: "",
		},
		{
			thumbnail: "https://www.materiel-velo.com/92859-large_default/vtt-cross-country-trek-marlin-8-gen-3-crimson.jpg",
			alt: "",
		},
		{
			thumbnail: "https://www.revedevelo.com/287-large_default/vtt-29-trek-marlin-4-alpine-blue.jpg",
			alt: "",
		},
		{
			thumbnail:
				"https://www.allterraincycles.co.uk/cdn/shop/files/Marlin4-24-41613-C-Portrait.webp?v=1702563590&width=1445",
			alt: "",
		},
	]

	for (const { thumbnail, alt } of productPictures) {
		const productPicture = new Product_picture()
		Object.assign(productPicture, {
			thumbnail,
			alt,
			product,
		})
		await productPicture.save()
	}

	const booking = new Booking()
	Object.assign(booking, {
		status: StatusBooking.BOOKED,
		bookingDate: new Date("2024-06-04T10:15:30.000Z"),
		startDate: new Date("2024-06-10T08:00:00.000Z"),
		endDate: new Date("2024-06-15T19:00:00.000Z"),
		user: admin,
		agency,
	})
	await booking.save()

	const bookingItem = new BookingItem()
	Object.assign(bookingItem, {
		status: BookingItemStatus.RENTED,
		booking,
		productCode,
		startDate: new Date("2024-06-10T08:00:00.000Z"),
		endDate: new Date("2024-06-15T19:00:00.000Z"),
		product,
	})
	await bookingItem.save()

	const review = new Review()
	Object.assign(review, {
		rate: 4,
		comment: "Good product, I recommend it!",
		product,
		user: customer,
	})
	await review.save()

	await db.destroy()
	console.log("Done!")
}

main()
