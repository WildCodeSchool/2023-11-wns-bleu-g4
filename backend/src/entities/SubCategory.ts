import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import Category from "./Category"
import { Length } from "class-validator"
import { ObjectId } from "../utils"

@Entity()
@ObjectType()
export class SubCategory extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	name: string

	@Column()
	@Field()
	thumbnail: string

	@ManyToOne(() => Category, (category) => category.subCategories)
	category: Category
}

@InputType()
export class NewSubCategoryInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field()
	name: string

	@Field()
	thumbnail: string

	@Field(() => ObjectId)
	category: ObjectId
}

@InputType()
export class UpdateSubCategoryInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field({ nullable: true })
	name?: string

	@Field({ nullable: true })
	thumbnail?: string

	@Field(() => ObjectId)
	category?: ObjectId
}

export default SubCategory
