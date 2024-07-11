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
import allProducts from "./data/ekosport/allProducts.json"

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
		email: "geargo.wild@gmail.com",
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
		name: "GearGo Agency",
		address: "456 Rue de GearGo",
		postcode: "75001",
		city: "Paris",
		country: "France",
		phone: "+33687654321",
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

	const categoryMapping: Record<string, string> = {
		"Hiking backpack": "Hiking",
		"Bivouac tent": "Hiking",
		"Board shorts": "Surf",
		"Cross-country ski set": "Ski",
		"Running jacket": "Hiking",
		"Trail running jacket": "Hiking",
		"Low-rise hiking boots": "Hiking",
		"Mid-rise hiking boots": "Hiking",
		"Trail running pole": "Hiking",
	}

	for (const productData of allProducts) {
		const product = new Product()
		const mappedCategoryName = categoryMapping[productData.category] || productData.category
		const category = categories.find((cat) => cat.name === mappedCategoryName) || categories.find((cat) => cat.id === 1)
		Object.assign(product, {
			name: productData.name,
			price: productData.price / 10,
			description: productData.description || "Produit de qualité supérieure pour répondre à tous vos besoins.",
			thumbnail: productData.imageUrls[0],
			category: category,
			brand: await getOrCreateBrand(productData.brand),
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

		for (const imageUrl of productData.imageUrls.slice(0, 5)) {
			const productPicture = new Product_picture()
			Object.assign(productPicture, {
				thumbnail: imageUrl,
				alt: "",
				product,
			})
			await productPicture.save()
		}

		const productCode = new ProductCode()
		Object.assign(productCode, {
			status: Status.AVAILABLE,
			product,
			agency,
			isSizeable: true,
			size: "M",
		})
		await productCode.save()

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
			productCode: productCode.id,
			startDate: new Date("2024-06-10T08:00:00.000Z"),
			endDate: new Date("2024-06-15T19:00:00.000Z"),
			product: product.id,
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
	}

	await db.destroy()
	console.log("Done!")
}

async function getOrCreateCategory(categoryName: string, parentCategory: ParentCategory): Promise<Category> {
	let category = await Category.findOne({ where: { name: categoryName } })
	if (!category) {
		category = new Category()
		category.name = categoryName
		category.parentCategory = parentCategory
		await category.save()
	}
	return category
}

async function getOrCreateBrand(brandName: string): Promise<Brand> {
	let brand = await Brand.findOne({ where: { name: brandName } })
	if (!brand) {
		brand = new Brand()
		brand.name = brandName
		brand.logo = "https://example.com/default-logo.jpg"
		await brand.save()
	}
	return brand
}

main()
