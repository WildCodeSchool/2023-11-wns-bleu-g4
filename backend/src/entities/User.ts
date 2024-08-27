import { IsEmail, IsStrongPassword, Length } from "class-validator"
import { Field, InputType, ObjectType } from "type-graphql"
import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { hash } from "argon2"
import Review from "./Review"
import { Booking } from "./Booking"

export enum UserRole {
	ADMIN = "admin",
	CUSTOMER = "customer",
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
	password: string

	@BeforeInsert()
	async hashPassword() {
		this.hashedPassword = await hash(this.password)
	}

	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field()
	id: number

	@Column({ unique: true })
	@Field()
	email: string

	@Column({ default: "name" })
	@Field()
	name: string

	@Column({ default: "account" })
	@Field()
	firstname: string

	@Column({ default: "address" })
	@Field()
	address: string

	@Column({ default: "postcode" })
	@Field()
	postcode: string

	@Column({ default: "city" })
	@Field()
	city: string

	@Column({ default: "country" })
	@Field()
	country: string

	@Column({ default: "phone" })
	@Field()
	phone: string

	@Column()
	hashedPassword: string

	@Column({
		default: "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
	})
	@Field()
	avatar: string

	@Column({ enum: UserRole, default: UserRole.CUSTOMER })
	@Field()
	role: UserRole

	@Column({ nullable: true, type: "varchar", unique: true })
	emailConfirmationToken?: string | null

	@Column({ default: false })
	emailVerified: boolean

	/** RELATIONS *********************/
	/** ONE TO MANY */
	@OneToMany(() => Booking, (bookings) => bookings.user)
	@Field(() => [Booking])
	bookings: Booking[]

	@OneToMany(() => Review, (reviews) => reviews.user)
	@Field(() => [Review])
	reviews: Review[]
}

@InputType()
export class NewUserInput {
	@IsEmail()
	@Field()
	email: string

	@Field()
	@IsStrongPassword()
	password: string
}

@InputType()
export class UpdateUserInput {
	@Length(2, 50)
	@Field({ nullable: true })
	name?: string

	@Length(2, 50)
	@Field({ nullable: true })
	firstname?: string

	@Length(2, 255)
	@Field({ nullable: true })
	address?: string

	@Length(2, 30)
	@Field({ nullable: true })
	postcode?: string

	@Length(2, 255)
	@Field({ nullable: true })
	city?: string

	@Length(2, 50)
	@Field({ nullable: true })
	country?: string

	@Length(2, 20)
	@Field({ nullable: true })
	phone?: string

	@Length(2, 255)
	@Field({ nullable: true })
	avatar?: string

	@Length(2, 255)
	@Field({ nullable: true })
	email?: string
}

@InputType()
export class LoginInput {
	@IsEmail()
	@Field()
	email: string

	@Field()
	@IsStrongPassword()
	password: string
}

export default User
