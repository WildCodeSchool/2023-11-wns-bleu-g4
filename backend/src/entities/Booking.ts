import { IsEnum } from "class-validator"
import { StatusBooking } from "../enum/StatusBooking"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import User from "./User"
import Agency from "./Agency"
import { UserId, AgencyId } from "../types"
import { BookingItem } from "./BookingItem"

@Entity()
@ObjectType()
export class Booking extends BaseEntity {
	/** COLUMNS *********************/
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

	/** RELATIONS *********************/
	/** MANY TO ONE */
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

	/** ONE TO MANY */
	@OneToMany(() => BookingItem, items => items.booking, {
		cascade: true,
		onDelete: "CASCADE"
	})
	@Field(() => [BookingItem])
	bookingItem: BookingItem[]

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
	user: UserId;

	@Field(() => AgencyId)
	agency: AgencyId;
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
	agency?: AgencyId;
}

@InputType()
export class CancelBookingInput {
	@Field(() => StatusBooking)
	status?: StatusBooking
}
