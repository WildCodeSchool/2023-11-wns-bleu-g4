import { Length } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import { Product } from "./Product"
import { ProductId } from "../types"

@Entity()
@ObjectType()
export class Product_picture extends BaseEntity {
	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	thumbnail: string

	@Column()
	@Field()
	alt: string

	/** RELATIONS *********************/
	/** MANY TO ONE */
	@ManyToOne(() => Product, (product) => product.pictures)
	@Field(() => Product)
	product: Product
}

@InputType()
export class NewProduct_pictureInput {
	@Length(1, 255)
	@Field()
	thumbnail: string

	@Length(1, 255)
	@Field()
	alt: string

	@Field(() => ProductId)
	productId: ProductId
}

@InputType()
export class UpdateProduct_pictureInput {

	@Length(1, 255)
	@Field()
	thumbnail?: string

	@Length(1, 255)
	@Field()
	alt?: string

	@Field(() => ProductId, { nullable: true })
	productId?: ProductId
}

export default Product_picture