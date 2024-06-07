import { IsEnum } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { Status } from "../enum/Status"
import { Agency } from "./Agency"
import { Product } from "./Product"
import { BookingItem } from "./BookingItem"
import { ObjectId } from "../types"

@Entity()
@ObjectType()
export class Product_code extends BaseEntity {
	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column({
		type: "enum",
		enum: Status,
	})
	@Field(() => Status)
	@IsEnum(Status)
	status: Status

	/** RELATIONS *********************/
	/** MANY TO ONE */
	@ManyToOne(() => Product, (product) => product.productCodes, { eager: true })
	@Field(() => Product, { nullable: true })
	product: Product

	@ManyToOne(() => Agency, (agency) => agency.productCodes, { eager: true })
	@Field(() => Agency, { nullable: true })
	agency: Agency

	/** ONE TO MANY */
	@OneToMany(() => BookingItem, (item) => item.productCode, { eager: true })
	@Field(() => [BookingItem], { nullable: true })
	bookingItems: BookingItem[]
}

@InputType()
export class NewProductCodeInput {
	@Field(() => Status)
	status: Status

	@Field(() => ObjectId)
	productId: ObjectId

	@Field(() => ObjectId)
	agencyId: ObjectId
}

@InputType()
export class ProductCodeStatusInput {
	@Field(() => Status)
	status: Status
}


export default Product_code
