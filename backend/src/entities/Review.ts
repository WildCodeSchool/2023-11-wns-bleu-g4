import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import Product from "./Product"
import User from "./User"
import { Length, Max, Min } from "class-validator"
import { ProductId, UserId } from "../types"

@Entity()
@ObjectType()
export class Review extends BaseEntity {
	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field(() => Int)
	rate: number

	@Column({ type: "text" })
	@Field()
	comment: string

	@ManyToOne(() => Product, (product) => product.reviews, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => Product, { nullable: true })
	product: Product

	/** RELATIONS *********************/
	/** MANY TO ONE */
	@ManyToOne(() => User, (user) => user.reviews, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => User, { nullable: true })
	user: User
}

@InputType()
export class NewReviewInput {
	@Field(() => Int)
	@Min(1)
	@Max(5)
	rate: number

	@Field()
	@Length(1, 500)
	comment: string

	@Field(() => ProductId)
	productId: ProductId

	@Field(() => UserId)
	userId: UserId
}

@InputType()
export class UpdateReviewInput {
	@Field({ nullable: true })
	rate?: number

	@Field({ nullable: true })
	comment?: string
}

export default Review
