import { Length, Min } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { BrandId, CategoryId, CharacteristicID } from "../types"
import { ObjectId } from "../utils"
import { BookingItem } from "./BookingItem"
import Brand from "./Brand"
import Category from "./Category"
import ProductCharacteristic from "./ProductCharacteristic"
import { ProductCode } from "./ProductCode"
import { Product_picture } from "./ProductPicture"
import Review from "./Review"

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

	@Column({ default: "https://rad-protection.com/wp-content/uploads/2024/02/logo-trek-velo-1024x1024.png" })
	@Field()
	thumbnail: string

	/** RELATIONS ****************************/
	/** MANY TO ONE */
	@ManyToOne(() => Category, (category) => category.products, { cascade: true, onDelete: "CASCADE" })
	@Field(() => Category)
	category: Category

	@ManyToOne(() => Brand, (brand) => brand.product, { cascade: true, onDelete: "CASCADE" })
	@Field(() => Brand)
	brand: Brand

	/** ONE TO MANY */
	@OneToMany(() => Review, (reviews) => reviews.product,)
	@Field(() => [Review], { nullable: true })
	reviews: Review[]

	@OneToMany(() => ProductCode, (productCode) => productCode.product)
	@Field(() => [ProductCode])
	productCodes: ProductCode[]

	@OneToMany(() => Product_picture, (product_picture) => product_picture.product)
	@Field(() => [Product_picture])
	pictures: Product_picture[]

	@OneToMany(() => BookingItem, (items) => items.product)
	@Field(() => [BookingItem])
	bookingItem: BookingItem[]

	@ManyToMany(() => ProductCharacteristic, (productCharacteristic) => productCharacteristic.product, { cascade: true })
	@JoinTable()
	@Field(() => [ProductCharacteristic])
	characteristics: ProductCharacteristic[]
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

	@Field(() => CharacteristicID, { nullable: true })
	characteristics: CharacteristicID[]

	@Field()
	thumbnail: string

	@Field(() => CategoryId, { nullable: true })
	category?: CategoryId

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

	@Length(2, 255)
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
