import { Field, InputType, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Product from "./Product"

@Entity()
@ObjectType()
export class Brand extends BaseEntity {
	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	name: string

	@Column()
	@Field()
	logo: string

	/** RELATIONS *********************/
	/** ONE TO MANY */
	@OneToMany(() => Product, (products) => products.brand)
	@Field(() => [Product])
	product: Product[]
}

@InputType()
export class NewBrandInput {
	@Field()
	name: string

	@Field()
	logo: string
}

@InputType()
export class UpdateBrandInput {
	@Field({ nullable: true })
	name?: string

	@Field({ nullable: true })
	logo?: string
}

export default Brand
