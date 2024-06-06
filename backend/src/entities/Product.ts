import { Length, Min } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { ObjectId } from "../utils"
import Category from "./Category"
import { Product_code } from "./Product_code"
import { Product_picture } from "./Product_picture"
import Review from "./Review"
import { BookingItem } from "./BookingItem"

@Entity()
@ObjectType()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	name: string

	@Column({ type: "float" })
	@Field()
	price: number

	@Column({ type: "text" })
	@Field()
	description: string

	@Column()
	@Field()
	brand: string

	@Column({
		default:
			"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
	})
	@Field()
	thumbnail: string

	@JoinTable()
	@ManyToMany(() => Category, (categories) => categories.products, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => [Category])
	categories: Category[]

	@OneToMany(() => Review, (reviews) => reviews.product)
	@Field(() => [Review])
	reviews: Review[]

	@OneToMany(() => Product_code, (productCode) => productCode.product)
	@Field(() => [Product_code])
	productCodes: Product_code[]

	@OneToMany(
		() => Product_picture,
		(product_picture) => product_picture.product
	)
	@Field(() => [Product_picture])
	pictures: Product_picture[]

	@OneToMany(
		() => BookingItem,
		(items) => items.product
	)
	@Field(() => [BookingItem])
	bookingItem: BookingItem[]
}

@InputType()
export class NewProductInput {
	@Length(3, 50, { message: "Le titre doit contenir entre 3 et 50 caractères" })
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

	@Field(() => [ObjectId])
	categories: ObjectId[]

	@Field(() => [ObjectId], { nullable: true })
	reviews: ObjectId[]
}

@InputType()
export class UpdateProductInput {
	@Length(3, 50, { message: "Le titre doit contenir entre 3 et 50 caractères" })
	@Field({ nullable: true })
	name?: string

	@Min(0, { message: "Le prix doit etre positif" })
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

	@Field(() => [ObjectId])
	categories?: ObjectId[]

	@Field(() => [ObjectId], { nullable: true })
	reviews?: ObjectId[]
}

export default Product
