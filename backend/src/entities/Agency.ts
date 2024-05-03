import { Length, Min } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
// import ProductCode from "./ProductCode"

@Entity()
@ObjectType()
export class Agency extends BaseEntity {
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
	zipcode: number

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

    // @OneToMany(() => ProductCode, (products) => products.agency)
	// @Field(() => [ProductCode])
	// products: ProductCode[]
}

@InputType()
export class NewAgencyInput {
	@Field()
	name: string

	@Field()
	address: string

	@Field()
	zipcode: number

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
	zipcode?: number

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
