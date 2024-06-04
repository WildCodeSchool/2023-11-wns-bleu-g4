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

@Entity()
@ObjectType()
export class Product_picture extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	thumbnail: string

	@Column()
	@Field()
	alt: string

	@ManyToOne(() => Product, (product) => product.pictures)
	@Field(() => Product)
	product: Product
}

@InputType()
export class NewProduct_pictureInput {
	@Column()
	@Length(1, 255)
	@Field()
	thumbnail: string

	@Column()
	@Length(1, 255)
	@Field()
	alt: string

	@Column()
	@Field(() => Int)
	productId: number
}

@InputType()
export class UpdateProduct_pictureInput {
	@Column()
	@Length(1, 255)
	@Field()
	thumbnail?: string

	@Column()
	@Length(1, 255)
	@Field()
	alt?: string

	@Column()
	@Field(() => Int)
	productId?: number
}

export default Product_picture
