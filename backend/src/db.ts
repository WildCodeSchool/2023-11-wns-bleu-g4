import { DataSource } from "typeorm"
import Agency from "./entities/Agency"
import Category from "./entities/Category"
import Product from "./entities/Product"
import { Product_code } from "./entities/Product_code"
import Review from "./entities/Review"
import SubCategory from "./entities/SubCategory"
import { User } from "./entities/User"
import env from "./env"
import { Booking } from "./entities/Booking"

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
		SubCategory,
		Review,
		User,
		Agency,
		Product_code,
		Booking
	],
	synchronize: true,
})

export async function clearDB() {
	const entities = db.entityMetadatas
	const tableNames = entities
		.map((entity) => `"${entity.tableName}"`)
		.join(", ")
	await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`)
}

export default db
