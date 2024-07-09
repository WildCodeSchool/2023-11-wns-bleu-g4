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
		name: "GearGo Agency",
		address: "456 Rue de GearGo",
		postcode: "75001",
		city: "Paris",
		country: "France",
		phone: "+33687654321",
		email: "agency@geargo.fr",
	})
	await agency.save()

	const brand = new Brand()
	Object.assign(brand, {
		name: "GearGo Brand",
		logo: "https://example.com/logo.jpg",
	})
	await brand.save()

	const parentCategoriesData = [
		{
			id: ParentCategoryId.BIKES,
			name: "Bikes",
		},
		{
			id: ParentCategoryId.ACCESSORIES,
			name: "Accessories",
		},
	]

	const parentCategories: ParentCategory[] = []
	for (const data of parentCategoriesData) {
		const parentCategory = new ParentCategory()
		Object.assign(parentCategory, data)
		await parentCategory.save()
		parentCategories.push(parentCategory)
	}

	const categoriesData = [
		{
			name: "Mountain Bikes",
			thumbnail: "https://example.com/mountain-bikes.jpg",
			parentCategory: parentCategories[0],
		},
		{
			name: "Road Bikes",
			thumbnail: "https://example.com/road-bikes.jpg",
			parentCategory: parentCategories[0],
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

	for (const productData of allProducts.slice(0, 40)) {
		const product = new Product()
		Object.assign(product, {
			name: productData.name,
			price: productData.price,
			description: productData.description || "Produit de qualité supérieure pour répondre à tous vos besoins.",
			thumbnail: productData.imageUrls[0],
			category: await getOrCreateCategory(productData.category),
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
	}

	await db.destroy()
	console.log("Done!")
}

async function getOrCreateCategory(categoryName: string): Promise<Category> {
	let category = await Category.findOne({ where: { name: categoryName } })
	if (!category) {
		category = new Category()
		category.name = categoryName
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