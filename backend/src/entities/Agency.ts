import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { Product_code } from "./ProductCode"
import { Booking } from "./Booking"

@Entity()
@ObjectType()
export class Agency extends BaseEntity {
	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	name: string

	@Column()
	@Field()
	address: string

	@Column()
	@Field()
	postcode: string

	@Column()
	@Field()
	city: string

	@Column()
	@Field()
	country: string

	@Column()
	@Field()
	phone: string

	@Column()
	@Field()
	email: string

	/** RELATIONS *********************/
	/** ONE TO MANY */
	@OneToMany(() => Product_code, (productCode) => productCode.agency)
	@Field(() => [Product_code])
	productCodes: Product_code[]

	@OneToMany(() => Booking, (bookings) => bookings.agency)
	@Field(() => [Booking])
	bookings: Booking[]
}

@InputType()
export class NewAgencyInput {
	@Field()
	name: string

	@Field()
	address: string

	@Field()
	postcode: string

	@Field()
	city: string

	@Field()
	country: string

	@Field()
	phone: string

	@Field()
	email: string
}

@InputType()
export class UpdateAgencyInput {
	@Field({ nullable: true })
	name?: string

	@Field({ nullable: true })
	address?: string

	@Field({ nullable: true })
	postcode?: string

	@Field({ nullable: true })
	city?: string

	@Field({ nullable: true })
	country?: string

	@Field({ nullable: true })
	phone?: string

	@Field({ nullable: true })
	email?: string
}

export default Agency
