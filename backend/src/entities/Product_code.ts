import { IsEnum } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { Status } from "../enum/Status"
import { Agency } from "./Agency"
import { Product } from "./Product"
import { BookingItem } from "./BookingItem"
import { AgencyId, ObjectId, ProductId } from "../types"

@Entity()
@ObjectType()
export class Product_code extends BaseEntity {
	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column({
		type: "enum",
		enum: Status,
	})
	@Field(() => Status)
	@IsEnum(Status)
	status: Status

	/** RELATIONS *********************/
	/** MANY TO ONE */
	@ManyToOne(() => Product, (product) => product.productCodes, {
		eager: true,
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => Product, { nullable: true })
	product: Product

	@ManyToOne(() => Agency, (agency) => agency.productCodes, {
		eager: true,
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => Agency, { nullable: true })
	agency: Agency

	/** ONE TO MANY */
	@OneToMany(() => BookingItem, (item) => item.productCode, {
		eager: true,
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => [BookingItem], { nullable: true })
	bookingItems: BookingItem[]
}

@InputType()
export class NewProductCodeInput {
	@Field(() => Status)
	status: Status

	@Field(() => ProductId)
	productId: ProductId

	@Field(() => AgencyId)
	agencyId: AgencyId
}

@InputType()
export class ProductCodeStatusInput {
	@Field(() => Status)
	status: Status
}


export default Product_code
