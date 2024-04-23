import { IsEmail, IsStrongPassword, Length } from "class-validator"
import { Field, InputType, ObjectType } from "type-graphql"
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { hash } from "argon2"

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
	VISITOR = "visitor",
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
	password: string

	@BeforeInsert()
	async hashPassword() {
		this.hashedPassword = await hash(this.password)
	}

	@Field()
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column({ unique: true })
	email: string

	@Field()
	@Column()
	nickname: string

	@Column()
	hashedPassword: string

	@Column({
		default:
			"https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
	})
	@Field()
	avatar: string

	//   Missing rent field - need to update
	//   @Field(() => Rent[])
	//   @OneToMany(() => Rent, (rent) => rent.user)
	//   rents: Rent[];

	@Field()
	@Column({ enum: UserRole, default: UserRole.VISITOR })
	role: UserRole

	@Column({ nullable: true, type: "varchar", unique: true })
	emailConfirmationToken?: string | null

	@Column({ default: false })
	emailVerified: boolean
}

@InputType()
export class NewUserInput {
	@IsEmail()
	@Field()
	email: string

	@Length(2, 30)
	@Field()
	nickname: string

	@Length(2, 30)
	@Field({ nullable: true })
	avatar?: string

	@Field()
	@IsStrongPassword()
	password: string
}

@InputType()
export class UpdateUserInput {
	@Length(2, 30)
	@Field({ nullable: true })
	nickname?: string

	@Length(2, 255)
	@Field({ nullable: true })
	avatar?: string
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
