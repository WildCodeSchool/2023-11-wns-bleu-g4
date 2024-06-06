import { IsEnum } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import { Status } from "../enum/Status"
import { Agency } from "./Agency"
import { Product } from "./Product"

@Entity()
@ObjectType()
export class Product_code extends BaseEntity {
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

	@Field(() => Product, { nullable: true })
	@ManyToOne(() => Product, (product) => product.productCodes, { eager: true })
	product: Product

	@Field(() => Agency, { nullable: true })
	@ManyToOne(() => Agency, (agency) => agency.productCodes, { eager: true })
	agency: Agency

	@Column({ nullable: true })
	@Field(() => String, { nullable: true })
	size: string

	@Column({ type: "boolean", default: false })
	@Field()
	isSizeable: boolean
}

@InputType()
export class ProductCodeStatusInput {
	@Field(() => Status)
	status: Status
}

export default Product_code
