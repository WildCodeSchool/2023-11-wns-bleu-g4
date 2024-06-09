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
import Product from "./Product"
import ParentCategory from "./ParentCategory"
import { Length } from "class-validator"
import { ParentCategoryId } from "../types"

@Entity()
@ObjectType()
export class Category extends BaseEntity {
	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	name: string

	/** RELATIONS *******************/
	/** ONE TO MANY */
	@OneToMany(() => Product, (products) => products.category)
	@Field(() => [Product])
	products: Product[]

	/** MANY TO MANY */
	@JoinTable()
	@ManyToMany(() => ParentCategory)
	@Field(() => [ParentCategory])
	parentCategories: ParentCategory[]
}

@InputType()
export class NewCategoryInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field()
	name: string

	@Field(() => ParentCategoryId, { nullable: true })
	parentCategories?: ParentCategoryId
}

@InputType()
export class UpdateCategoryInput {
	@Field({ nullable: true })
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	name?: string

	@Field(() => ParentCategoryId, { nullable: true })
	parentCategories?: ParentCategoryId
}

export default Category
