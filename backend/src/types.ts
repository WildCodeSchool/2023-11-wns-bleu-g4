import express from "express"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import Product from "./entities/Product"
import { User } from "./entities/User"
import ProductCharacteristic from "./entities/ProductCharacteristic"
import Brand from "./entities/Brand"
import Booking from "./entities/Booking"

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
@InputType()
export class ProductId {
	@Field(() => Int)
	id!: number;
}

@InputType()
export class ProductCodeId {
	@Field(() => Int)
	id!: number;
}

@InputType()
export class BookingId {
	@Field(() => Int)
	id!: number;
}

@InputType()
export class CategoryId {
	@Field(() => Int)
	id!: number;
}

@InputType()
export class CharacteristicID {
	@Field(() => Int)
	id!: number;
}

@InputType()
export class ParentCategoryId {
	@Field(() => Int)
	id!: number;
	static BIKES: any;
	static ACCESSORIES: any;
}

@InputType()
export class BrandId {
	@Field(() => Int)
	id!: number;
}

@ObjectType()
export class ProductList {
	@Field(() => [Product])
	products: Product[];

	@Field(() => Int)
	total: number;
}

@ObjectType()
export class UserList {
	@Field(() => [User])
	users: User[];

	@Field(() => Int)
	total: number;
}

@ObjectType()
export class ProductCharacteristicList {
	@Field(() => [ProductCharacteristic])
	productCharacteristics: ProductCharacteristic[];

	@Field(() => Int)
	total: number;
}

@ObjectType()
export class BrandList {
	@Field(() => [Brand])
	brands: Brand[];

	@Field(() => Int)
	total: number;
}

@ObjectType()
export class BookingList {
	@Field(() => [Booking])
	bookings: Booking[];

	@Field(() => Int)
	total: number;
}
