import { IsEnum, IsNotEmpty } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { StatusBooking } from "../enum/StatusBooking";
import { AgencyId, UserId } from "../types";
import Agency from "./Agency";
import { BookingItem } from "./BookingItem";
import User from "./User";

const NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

@Entity()
@ObjectType()
export class Booking extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Column({
		type: "enum",
		enum: StatusBooking,
	})
	@Field(() => StatusBooking, { defaultValue: StatusBooking.BOOKED })
	@IsEnum(StatusBooking)
	status: StatusBooking;

	@Column()
	@Field()
	invoice: string;

	@Column()
	@Field()
	bookingDate: Date;

	@Column()
	@Field()
	startDate: Date;

	@Column()
	@Field()
	endDate: Date;

	@ManyToOne(() => User, (user) => user.bookings, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => User)
	user: User;

	@ManyToOne(() => Agency, (agency) => agency.bookings, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => Agency)
	agency: Agency;

	@OneToMany(() => BookingItem, (items) => items.booking, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => [BookingItem])
	bookingItem: BookingItem[];

	@BeforeInsert()
	generateInvoice() {
		const shortUuid = uuidv5(uuidv4(), NAMESPACE).replace(/-/g, "").substring(0, 8).toUpperCase();
		this.invoice = `INV-${shortUuid}-${this.agency.id}`;
	}
}

@InputType()
export class NewBookingInput {
	@Field(() => StatusBooking)
	status: StatusBooking;

	@Field()
	bookingDate: Date;

	@Field()
	@IsNotEmpty()
	startDate: Date;

	@Field()
	@IsNotEmpty()
	endDate: Date;

	@Field(() => UserId)
	user: UserId;

	@Field(() => AgencyId)
	agency: AgencyId;

	@Field(() => Int)
	productId: number;

	@Field(() => Int, { nullable: true })
	productCodeId: number;

	@Field(() => Int, { defaultValue: 1 })
	quantity: number;

	@Field(() => String, { nullable: true })
	size?: string | number;
}


@InputType()
export class UpdateBookingInput {
	@Field(() => StatusBooking)
	status?: StatusBooking

	@Field({ nullable: true })
	bookingDate?: Date

	@Field({ nullable: true })
	startDate?: Date

	@Field({ nullable: true })
	endDate?: Date

	@Field(() => AgencyId, { nullable: true })
	agency?: AgencyId;

	@Field(() => String, { nullable: true })
	size?: string | number
}

@InputType()
export class CancelBookingInput {
	@Field(() => StatusBooking)
	status?: StatusBooking
}

export default Booking

