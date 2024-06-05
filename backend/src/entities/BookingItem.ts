import { Field, InputType, Int, ObjectType } from "type-graphql"
import { IsEnum } from "class-validator"
import {ObjectId} from '../types'
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import Product from "./Product"
import { BookingItemStatus } from "../enum/BookingItemStatus"

@Entity()
@ObjectType()
export class BookingItem extends BaseEntity {

	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field(() => String)
	name: string

	@Column({
		type: "enum",
		enum: BookingItemStatus,
	})
	@Field(() => BookingItemStatus)
	@IsEnum(BookingItemStatus)
	status: BookingItemStatus

	@Column()
	@Field(() => Int)
	quantity: number

	@Column()
	@Field(() => Int)
	unit_price: number

	// @OneToOne(() => Booking)
	// @JoinColumn()
	// @Field(() => Booking)
	// booking: Booking

	@OneToOne(() => Product)
	@JoinColumn()
	@Field(() => Product)
	product: Product

}

@InputType()
export class NewBookingItemInput {
	@Field(() => String)
	name: string

	@Field(() => BookingItemStatus)
	@IsEnum(BookingItemStatus)
	status: BookingItemStatus

	@Field(() => Int)
	quantity: number

	@Field(() => Int)
	unit_price: number

	@Field(() => ObjectId)
	product: ObjectId

	@Field(() => ObjectId)
	booking: ObjectId
}

@InputType()
export class UpdateBookingItemInput {
	@Field(() => String)
	name?: string

	@Field(() => BookingItemStatus)
	@IsEnum(BookingItemStatus)
	status?: BookingItemStatus

	@Field(() => Int)
	quantity?: number

	@Field(() => Int)
	unit_price?: number
}