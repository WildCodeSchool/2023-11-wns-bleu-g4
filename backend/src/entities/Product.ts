import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { ObjectId } from "../types"
import BookingItem from "./BookingItem"
import Brand from "./Brand"
import Category from "./Category"
import ProductCharacteristic from "./ProductCharacteristic"
import ProductCode from "./ProductCode"
import ProductPicture from "./ProductPicture"
import Review from "./Review"
import { v4 as uuidv4, v5 as uuidv5 } from "uuid"

const NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341"

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

	@Column({ default: "https://rad-protection.com/wp-content/uploads/2024/02/logo-trek-velo-1024x1024.png" })
	@Field()
	thumbnail: string

	@Column()
	@Field()
	ref: string

	@BeforeInsert()
	generateInvoice() {
		const shortUuid = uuidv5(uuidv4(), NAMESPACE).replace(/-/g, "").substring(0, 8).toUpperCase()
		this.ref = `REF-${shortUuid}`
	}

	// Relations

	@ManyToOne(() => Category, (category) => category.products, { cascade: true, onDelete: "CASCADE", nullable: true })
	@Field(() => Category)
	category: Category

	@ManyToOne(() => Brand, (brand) => brand.product, { cascade: true, onDelete: "CASCADE" })
	@Field(() => Brand)
	brand: Brand

	/** ONE TO MANY */
	@OneToMany(() => Review, (reviews) => reviews.product)
	@Field(() => [Review], { nullable: true })
	reviews: Review[]

	@OneToMany(() => ProductCode, (productCode) => productCode.product)
	@Field(() => [ProductCode])
	productCodes: ProductCode[]

	@OneToMany(() => ProductPicture, (product_picture) => product_picture.product)
	@Field(() => [ProductPicture])
	pictures: ProductPicture[]

	@OneToMany(() => BookingItem, (items) => items.product)
	@Field(() => [BookingItem])
	bookingItem: BookingItem[]

	@ManyToMany(() => ProductCharacteristic, (productCharacteristic) => productCharacteristic.product)
	@JoinTable()
	@Field(() => [ProductCharacteristic])
	characteristics: ProductCharacteristic[]

	@Field(() => Int)
	total: number
}

@InputType()
export class NewProductInput {
	@Field()
	name: string

	@Field()
	price: number

	@Field()
	description: string

	@Field(() => [ObjectId], { nullable: true })
	characteristics?: ObjectId[]

	@Field()
	thumbnail: string

	@Field(() => ObjectId, { nullable: true })
	category?: ObjectId

	@Field(() => ObjectId)
	brand: ObjectId
}

@InputType()
export class UpdateProductInput {
	@Field({ nullable: true })
	name?: string

	@Field({ nullable: true })
	price?: number

	@Field({ nullable: true })
	description?: string

	@Field({ nullable: true })
	thumbnail?: string

	@Field(() => ObjectId, { nullable: true })
	category?: ObjectId

	@Field(() => ObjectId, { nullable: true })
	brand?: ObjectId

	@Field(() => [ObjectId], { nullable: true })
	characteristics?: ObjectId[]
}

export default Product
