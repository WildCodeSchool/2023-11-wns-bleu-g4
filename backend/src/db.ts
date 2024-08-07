import { DataSource } from "typeorm"
import Agency from "./entities/Agency"
import { Booking } from "./entities/Booking"
import { BookingItem } from "./entities/BookingItem"
import Brand from "./entities/Brand"
import Category from "./entities/Category"
import ParentCategory from "./entities/ParentCategory"
import Product from "./entities/Product"
import ProductCharacteristic from "./entities/ProductCharacteristic"
import { ProductCode } from "./entities/ProductCode"
import { Product_picture } from "./entities/ProductPicture"
import Review from "./entities/Review"
import { User } from "./entities/User"
import env from "./env"

const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST } = env

const db = new DataSource({
	type: "postgres",
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USER,
	password: DB_PASS,
	database: DB_NAME,
	entities: [
		Category,
		Product,
		ParentCategory,
		Review,
		User,
		Agency,
		ProductCode,
		BookingItem,
		Product_picture,
		Booking,
		Brand,
		ProductCharacteristic,
	],
	synchronize: true,
})

export async function clearDB() {
	const entities = db.entityMetadatas
	const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(", ")
	await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`)
}

export default db
