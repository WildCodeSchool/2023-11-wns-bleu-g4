import { Length } from "class-validator"
import { Field, Int, ObjectType } from "type-graphql"
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
	@Length(1, 255)
	@Field()
	thumbnail: string

	@Column()
	@Length(1, 255)
	@Field()
	alt: string

	@ManyToOne(() => Product, (product) => product.pictures)
	@Field(() => Product)
	product: Product
}

export default Product_picture
