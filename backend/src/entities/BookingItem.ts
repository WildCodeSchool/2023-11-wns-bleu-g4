import { IsEnum } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import { BookingItemStatus } from "../enum/BookingItemStatus"
import { BookingId, ProductId } from "../types"
import { Booking } from "./Booking"
import Product from "./Product"

@Entity()
@ObjectType()
export class BookingItem extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column({
		type: "enum",
		enum: BookingItemStatus,
	})
	@Field(() => BookingItemStatus, { defaultValue: BookingItemStatus.RENTED })
	@IsEnum(BookingItemStatus)
	status: BookingItemStatus

	@Column()
	@Field(() => Int)
	quantity: number

	@Column()
	@Field(() => Int)
	total_price: number

	@ManyToOne(() => Booking, (booking) => booking.bookingItem)
	@Field(() => Booking)
	booking: Booking

	@ManyToMany(() => Product, (product) => product.bookingItem)
	@Field(() => Product)
	product: Product
}

@InputType()
export class NewBookingItemInput {
	@Field(() => BookingItemStatus)
	@IsEnum(BookingItemStatus)
	status: BookingItemStatus

	@Field()
	quantity: number

	@Field()
	total_price: number

	@Field(() => BookingId)
	booking: BookingId

	@Field(() => ProductId)
	product: ProductId
}

@InputType()
export class UpdateBookingItemInput {
	@Field(() => BookingItemStatus)
	@IsEnum(BookingItemStatus)
	status?: BookingItemStatus

	@Field()
	quantity?: number

	@Field()
	total_price?: number
}
