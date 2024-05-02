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

@Entity()
@ObjectType()
export class Review extends BaseEntity {
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

	@Field(() => Int)
	productId: number

	@Field(() => Int)
	userId: number
}

@InputType()
export class UpdateReviewInput {
	@Field(() => Int, { nullable: true })
	rate?: number

	@Field({ nullable: true })
	comment?: string
}

export default Review
