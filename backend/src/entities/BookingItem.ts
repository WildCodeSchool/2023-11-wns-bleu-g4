import { Field, InputType, Int, ObjectType } from "type-graphql"
import { IsEnum } from "class-validator"
import { BookingId, ProductId } from '../types'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import Product from "./Product"
import { BookingItemStatus } from "../enum/BookingItemStatus"
import { Booking } from "./Booking"
import Product_code from "./Product_code"

@Entity()
@ObjectType()
export class BookingItem extends BaseEntity {
	/** COLUMNS *********************/
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

	/** RELATIONS *********************/
	/** MANY TO ONE */
	@ManyToOne(() => Booking, (booking) => booking.bookingItem)
	@Field(() => Booking)
	booking: Booking

	@ManyToOne(() => Product, (product) => product.bookingItem)
	@Field(() => Product)
	product: Product

	@ManyToOne(() => Product_code, (product) => product.bookingItems)
	@Field(() => Product_code)
	productCode: Product_code
}

@InputType()
export class NewBookingItemInput {
	@Field(() => BookingItemStatus)
	@IsEnum(BookingItemStatus)
	status: BookingItemStatus

	@Field(() => BookingId)
	booking: BookingId

	@Field(() => ProductId)
	productCodes: ProductId
}

@InputType()
export class UpdateBookingItemInput {
	@Field(() => BookingItemStatus)
	@IsEnum(BookingItemStatus)
	status?: BookingItemStatus
}