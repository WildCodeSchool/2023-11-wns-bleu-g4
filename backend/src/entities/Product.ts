import { Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectId } from "../types";
import BookingItem from "./BookingItem";
import Brand from "./Brand";
import Category from "./Category";
import ProductCharacteristic from "./ProductCharacteristic";
import ProductCode from "./ProductCode";
import ProductPicture from "./ProductPicture";
import Review from "./Review";

@Entity()
@ObjectType()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Column()
	@Field()
	name: string;

	@Column({ type: "float" })
	@Field()
	price: number;

	@Column({ type: "text" })
	@Field()
	description: string;

	@Column({ default: "https://rad-protection.com/wp-content/uploads/2024/02/logo-trek-velo-1024x1024.png" })
	@Field()
	thumbnail: string;

	// Relations

	@ManyToOne(() => Category, (category) => category.products, { cascade: true, onDelete: "CASCADE" })
	@Field(() => Category)
	category: Category;

	@ManyToOne(() => Brand, (brand) => brand.product, { cascade: true, onDelete: "CASCADE" })
	@Field(() => Brand)
	brand: Brand;

	@OneToMany(() => Review, (reviews) => reviews.product)
	@Field(() => [Review], { nullable: true })
	reviews: Review[];

	@OneToMany(() => ProductCode, (productCode) => productCode.product)
	@Field(() => [ProductCode])
	productCodes: ProductCode[];

	@OneToMany(() => ProductPicture, (product_picture) => product_picture.product)
	@Field(() => [ProductPicture])
	pictures: ProductPicture[];

	@OneToMany(() => BookingItem, (items) => items.product)
	@Field(() => [BookingItem])
	bookingItem: BookingItem[];

	@ManyToMany(() => ProductCharacteristic, (productCharacteristic) => productCharacteristic.product, { cascade: true })
	@JoinTable()
	@Field(() => [ProductCharacteristic])
	characteristics: ProductCharacteristic[];

	@Field(() => Int)
	total: number;
}

@InputType()
export class NewProductInput {
	@Field()
	name: string;

	@Field()
	price: number;

	@Field()
	description: string;

	@Field(() => [ObjectId], { nullable: true })
	characteristics?: ObjectId[];

	@Field()
	thumbnail: string;

	@Field(() => ObjectId, { nullable: true })
	category?: ObjectId;

	@Field(() => ObjectId)
	brand: ObjectId;
}

@InputType()
export class UpdateProductInput {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	price?: number;

	@Field({ nullable: true })
	description?: string;

	@Field({ nullable: true })
	thumbnail?: string;

	@Field(() => ObjectId, { nullable: true })
	category?: ObjectId;

	@Field(() => ObjectId, { nullable: true })
	brand?: ObjectId;

	@Field(() => [ObjectId], { nullable: true })
	characteristics?: ObjectId[];
}

export default Product;
