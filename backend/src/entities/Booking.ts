import { Length, Min } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import User from "./User"
import Agency from "./Agency"
import { UserId, AgencyId } from "../types"

@Entity()
@ObjectType()
export class Booking extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	status: string

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
	@Field(()=>User)
	user: User
	
	@ManyToOne(() => Agency, (agency) => agency.bookings, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(()=>Agency)
	agency: Agency

}

@InputType()
export class NewBookingInput {
	@Field()
	status: string

	@Field()
	invoice: string

	@Field()
	bookingDate: Date

	@Field()
	startDate: Date

	@Field()
	endDate: Date

	@Field(()=> UserId)
	user: UserId;

	@Field(()=> AgencyId)
	agency: AgencyId;
}

@InputType()
export class UpdateBookingInput {
	@Field({ nullable: true })
	status?: string

	@Field({ nullable: true })
	invoice?: string

	@Field({ nullable: true })
	bookingDate?: Date

	@Field({ nullable: true })
	startDate?: Date

	@Field({ nullable: true })
	endDate?: Date

	@Field(()=> AgencyId)
	agency: AgencyId;
}

@InputType()
export class CancelBookingInput {
	@Field()
	status?: string
}