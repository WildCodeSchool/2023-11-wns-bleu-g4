import { Field, InputType, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProductId } from "../types"
import Product from "./Product"
import { Length } from "class-validator"

@Entity()
@ObjectType()
export class ProductCharacteristic extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	name: string

	@ManyToMany(() => Product, (product) => product.characteristics)
	@Field(() => Product)
	product: Product
}

@InputType()
export class NewProductCharacteristicInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field()
	name: string
}

@InputType()
export class UpdateProductCharacteristicInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field({ nullable: true })
	name?: string
}

export default ProductCharacteristic
