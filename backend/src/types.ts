import express from "express"
import { Field, InputType, Int } from "type-graphql"
import { User } from "./entities/User"

export interface ContextType {
	req: express.Request
	res: express.Response
	currentUser?: User
}

@InputType()
export class ObjectId {
	@Field(() => Int)
	id!: number
}

@InputType()
export class UserId {
	@Field(() => Int)
	id!: number
}

@InputType()
export class AgencyId {
	@Field(() => Int)
	id!: number
}
@InputType()
export class ProductId {
	@Field(() => Int)
	id!: number
}
@InputType()
export class BookingId {
	@Field(() => Int)
	id!: number
}

@InputType()
export class product_code {
	@Field(() => Int)
	id!: number
}
