import { Length, Min } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import { ObjectId } from "../utils"
import Category from "./Category"

@Entity()
@ObjectType()
export class Product extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
	name: string

	@Field()
	@Column({ type: "float" })
	price: number

	@Field()
	@Column({ type: "text" })
	description: string

	@Field()
	@Column()
	brand: string

	@Field()
	@Column({
		default:
			"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
	})
	thumbnail: string

	@ManyToOne(() => Category, (c) => c.products, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field()
	category: Category

	// @ManyToOne(() => Rating, (r) => r.products, {
	//     cascade: true,
	//     onDelete: "CASCADE",
	//   })
	//   @Field()
	//   rating: Rating;
}

@InputType()
export class NewProductInput {
	@Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
	@Field()
	name: string

	@Min(0, { message: "Le prix doit être positif" })
	@Field()
	price: number

	@Field()
	description: string

	@Field()
	brand: string

	@Field()
	thumbnail: string

	@Field(() => ObjectId)
	category: ObjectId
}

@InputType()
export class UpdateProductInput {
	@Field({ nullable: true })
	name?: string

	@Field({ nullable: true })
	price?: number

	@Length(2, 255)
	@Field({ nullable: true })
	description?: string

	@Length(2, 30)
	@Field({ nullable: true })
	brand?: string

	@Length(2, 255)
	@Field({ nullable: true })
	thumbnail?: string

	@Field(() => ObjectId, { nullable: true })
	category?: ObjectId
}

export default Product
