import "reflect-metadata"
import express from "express"
import cors from "cors"
import http from "http"
import db from "./db"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import schemaIsBuilt from "./schema"
import env from "./env"
import { Context } from "./utils"

const app = express()
const httpServer = http.createServer(app)

const { SERVER_PORT: port } = env

schemaIsBuilt.then(async (schema) => {
	await db.initialize()
	const server = new ApolloServer<Context>({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	})
	await server.start()
	app.use(
		"/",
		cors<cors.CorsRequest>({
			credentials: true,
			origin: env.CORS_ALLOWED_ORIGINS.split(","),
		}),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => ({ req, res }),
		})
	)
	await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
	console.log(`🚀 Server ready at http://localhost:4000/`)
})
