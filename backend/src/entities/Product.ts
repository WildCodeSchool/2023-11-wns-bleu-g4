import { Length, Min } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { ObjectId } from "../utils"
import Category from "./Category"
import { Product_code } from "./Product_code"
import { Product_picture } from "./Product_picture"
import Brand from "./Brand"
import Review from "./Review"
import { BookingItem } from "./BookingItem"
import { BrandId, CategoryId } from "../types"

@Entity()
@ObjectType()
export class Product extends BaseEntity {
	/** COLUMNS *****************************/
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

	@Column({ type: "text", nullable: true })
	@Field({ nullable: true })
	characteristic: string

	@Column({ default: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png" })
	@Field()
	thumbnail: string


	/** RELATIONS ****************************/
	/** MANY TO ONE */
	@ManyToOne(() => Category, categorie => categorie.products, { cascade: true, onDelete: "CASCADE" })
	@Field(() => Category)
	categorie: Category

	@ManyToOne(() => Brand, (brand) => brand.product, { cascade: true, onDelete: "CASCADE" })
	@Field(() => Brand)
	brand: Brand

	/** ONE TO MANY */
	@OneToMany(() => Review, (reviews) => reviews.product)
	@Field(() => [Review])
	reviews: Review[]

	@OneToMany(() => Product_code, (productCode) => productCode.product)
	@Field(() => [Product_code])
	productCodes: Product_code[]

	@OneToMany(() => Product_picture, (product_picture) => product_picture.product)
	@Field(() => [Product_picture])
	pictures: Product_picture[]

	@OneToMany(() => BookingItem, (items) => items.product)
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

	@Field({ nullable: true })
	characteristic?: string

	@Field()
	thumbnail: string

	@Field(() => CategoryId, {nullable:true})
	categorie?: CategoryId

	@Field(() => BrandId)
	brand: BrandId
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

	@Field({ nullable: true })
	characteristic?: string

	@Length(2, 255)
	@Field({ nullable: true })
	thumbnail?: string

	@Field(() => ObjectId, { nullable: true })
	categorie?: ObjectId

	@Field(() => ObjectId, { nullable: true })
	brand?: ObjectId
}

export default Product
