import { DataSource } from "typeorm"
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
	entities: [User],
	synchronize: true,
	logging: env.NODE_ENV !== "test",
})

export async function clearDB() {
	const entities = db.entityMetadatas
	const tableNames = entities
		.map((entity) => `"${entity.tableName}"`)
		.join(", ")
	await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`)
}

export default db
