import { User } from "./entities/User"
import express from "express"

export interface ContextType {
	req: express.Request
	res: express.Response
	currentUser?: User
}
