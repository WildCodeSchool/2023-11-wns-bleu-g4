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
import allProducts from "./data/ekosport/allProducts.json"
import * as fs from "node:fs"
import * as path from "node:path"
import { v4 as uuidv4, v5 as uuidv5 } from "uuid"

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
		name: "GearGo Capitol",
		address: "31, rue de la Chocolatine",
		postcode: "31330",
		city: "Toulouse",
		country: "France",
		phone: "0504030201",
		email: "geargo.wild@gmail.com",
	})
	await agency.save()

	const agency2 = new Agency()
	Object.assign(agency2, {
		name: "GearGo Lyon",
		address: "45, rue des Alpes",
		postcode: "69002",
		city: "Lyon",
		country: "France",
		phone: "0403020102",
		email: "geargo.lyon@gmail.com",
	})
	await agency2.save()

	const agency3 = new Agency()
	Object.assign(agency3, {
		name: "GearGo Marseille",
		address: "12, rue de la Méditerranée",
		postcode: "13001",
		city: "Marseille",
		country: "France",
		phone: "0403030202",
		email: "geargo.marseille@gmail.com",
	})
	await agency3.save()

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

	const characteristicObjects = []
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
		const existingCharacteristic = await ProductCharacteristic.findOne({ where: { name: characteristic } })
		if (existingCharacteristic) {
			characteristicObjects.push(existingCharacteristic)
		} else {
			const productCharacteristic = new ProductCharacteristic()
			productCharacteristic.name = characteristic
			await productCharacteristic.save()
			characteristicObjects.push(productCharacteristic)
		}
	}

	const agencies = [agency, agency2, agency3]

	function getRandomAgency() {
		return agencies[Math.floor(Math.random() * agencies.length)]
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
			characteristics: characteristicObjects,
		})

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

		function getRandomSize() {
			const sizesNumeric = Array.from({ length: 11 }, (_, i) => 36 + i)
			const sizesAlpha = ["S", "M", "L", "XL", "XXL"]

			const useNumericSizes = Math.random() < 0.5

			if (useNumericSizes) {
				const randomIndex = Math.floor(Math.random() * sizesNumeric.length)
				return sizesNumeric[randomIndex].toString()
			} else {
				const randomIndex = Math.floor(Math.random() * sizesAlpha.length)
				return sizesAlpha[randomIndex]
			}
		}

		const productCode = new ProductCode()
		Object.assign(productCode, {
			status: Status.AVAILABLE,
			product,
			agency: getRandomAgency(),
			isSizeable: true,
			size: getRandomSize(),
		})
		await productCode.save()

		const booking = new Booking()
		Object.assign(booking, {
			status: StatusBooking.BOOKED,
			bookingDate: new Date("2024-06-04T10:15:30.000Z"),
			startDate: new Date("2024-06-10T08:00:00.000Z"),
			endDate: new Date("2024-06-15T19:00:00.000Z"),
			user: admin,
			agency: getRandomAgency(),
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
			product: product.id,
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

		const manufacturePath = path.join(__dirname, "data", "manufacture")
		// console.log(`Searching in directory: ${manufacturePath}`);
		try {
			const files = fs.readdirSync(manufacturePath)
			const brandFile = files.find((file) => file.toLowerCase() === `${brandName.toLowerCase()}.webp`)

			if (brandFile) {
				const imagePath = path.join(manufacturePath, brandFile)
				//	console.log(`Found image at: ${imagePath}`);
				const fileBuffer = fs.readFileSync(imagePath)
				const form = new FormData()
				form.append("file", new Blob([fileBuffer]), brandFile)

				const response = await fetch("http://localhost:8000/uploads", {
					method: "POST",
					body: form,
				})

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const result = (await response.json()) as { url: string }
				brand.logo = result.url
			} else {
				//	console.warn(`Image not found for brand ${brandName}. Using default logo.`);
				brand.logo =
					"https://res.cloudinary.com/ekoweb/image/upload/s--avKnuAjv--/f_auto,h_80,q_auto:eco,w_80/v1/brand/19640937"
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				//	console.error(`Error processing image for ${brandName}:`, error.message);
			} else {
				//	console.error(`Unknown error processing image for ${brandName}`);
			}
			brand.logo =
				"https://res.cloudinary.com/ekoweb/image/upload/s--avKnuAjv--/f_auto,h_80,q_auto:eco,w_80/v1/brand/19640937"
		}

		await brand.save()
	}
	return brand
}
main()
