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
import { StatusBooking } from "../enum/StatusBooking"
import { AgencyId, UserId } from "../types"
import Agency from "./Agency"
import { BookingItem } from "./BookingItem"
import Product_code from "./Product_code"
import User from "./User"

@Entity()
@ObjectType()
export class Booking extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column({
		type: "enum",
		enum: StatusBooking,
	})
	@Field(() => StatusBooking, { defaultValue: StatusBooking.BOOKED })
	@IsEnum(StatusBooking)
	status: StatusBooking

	@Column()
	@Field()
	invoice: string

	@Column()
	@Field()
	bookingDate: Date

	@Column()
	@Field()
	startDate: Date

	@Column()
	@Field()
	endDate: Date

	@ManyToOne(() => User, (user) => user.bookings, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => User)
	user: User

	@ManyToOne(() => Agency, (agency) => agency.bookings, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => Agency)
	agency: Agency

	@OneToMany(() => BookingItem, (items) => items.booking, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => [BookingItem])
	bookingItem: BookingItem[]

	@ManyToOne(() => Product_code, (product_code) => product_code.bookings)
	@Field(() => Product_code)
	product_code: Product_code
}

@InputType()
export class NewBookingInput {
	@Field(() => StatusBooking)
	status?: StatusBooking

	@Field()
	invoice: string

	@Field()
	bookingDate: Date

	@Field()
	startDate: Date

	@Field()
	endDate: Date

	@Field(() => UserId)
	user: UserId

	@Field(() => Int)
	agency: AgencyId

	@Field(() => Int)
	productId!: number

	@Field({ nullable: true })
	size?: string

	@Field(() => Int)
	product_code!: number
}

@InputType()
export class UpdateBookingInput {
	@Field(() => StatusBooking)
	status?: StatusBooking

	@Field({ nullable: true })
	invoice?: string

	@Field({ nullable: true })
	bookingDate?: Date

	@Field({ nullable: true })
	startDate?: Date

	@Field({ nullable: true })
	endDate?: Date

	@Field(() => AgencyId, { nullable: true })
	agency?: AgencyId

	@Field({ nullable: true })
	size?: string

	@Field(() => Int)
	productId!: number
}

@InputType()
export class CancelBookingInput {
	@Field(() => StatusBooking)
	status?: StatusBooking
}
