import { InputType, Field, Int } from "type-graphql";
import { User } from "./entities/User"
import express from "express"

export interface ContextType {
	req: express.Request
	res: express.Response
	currentUser?: User
}

@InputType()
export class ObjectId {
	@Field(() => Int)
	id!: number;
}
@InputType()
export class UserId {
	@Field(() => Int)
	id!: number;
}
@InputType()
export class AgencyId {
	@Field(() => Int)
	id!: number;
}
