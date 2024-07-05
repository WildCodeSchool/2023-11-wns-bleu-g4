import { IsEnum } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { BookingItemStatus } from "../enum/BookingItemStatus";
import { BookingId, ProductId } from '../types';
import { Booking } from "./Booking";
import Product from "./Product";
import ProductCode from "./ProductCode";

@Entity()
@ObjectType()
export class BookingItem extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Column({
		type: "enum",
		enum: BookingItemStatus,
	})
	@Field(() => BookingItemStatus, { defaultValue: BookingItemStatus.RENTED })
	@IsEnum(BookingItemStatus)
	status: BookingItemStatus;

	@Column({ type: "timestamp" })
	@Field()
	startDate: Date;

	@Column({ type: "timestamp" })
	@Field()
	endDate: Date;

	@ManyToOne(() => Booking, (booking) => booking.bookingItem, { nullable: false })
	@Field(() => Booking)
	booking: Booking;

	@ManyToOne(() => Product, (product) => product.bookingItem, { nullable: false })
	@Field(() => Product)
	product: Product;

	@ManyToOne(() => ProductCode, (product) => product.bookingItems, { nullable: false })
	@Field(() => ProductCode)
	productCode: ProductCode;
}

@InputType()
export class NewBookingItemInput {
	@Field(() => BookingItemStatus)
	@IsEnum(BookingItemStatus)
	status: BookingItemStatus;

	@Field(() => BookingId)
	booking: BookingId;

	@Field(() => ProductId)
	productId: ProductId;

	@Field(() => ProductId)
	productCodeId: ProductId;

	@Field()
	startDate: Date;

	@Field()
	endDate: Date;
}

@InputType()
export class UpdateBookingItemInput {
	@Field(() => Int)
	id: number;

	@Field(() => BookingItemStatus, { nullable: true })
	@IsEnum(BookingItemStatus)
	status?: BookingItemStatus;

	@Field(() => BookingId, { nullable: true })
	booking?: BookingId;

	@Field(() => ProductId, { nullable: true })
	productId?: ProductId;

	@Field(() => ProductId, { nullable: true })
	productCodeId?: ProductId;

	@Field({ nullable: true })
	startDate?: Date;

	@Field({ nullable: true })
	endDate?: Date;
}

export default BookingItem