import { Length } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Category from "./Category"

@Entity()
@ObjectType()
export class ParentCategory extends BaseEntity {
	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	name: string

	@OneToMany(() => Category, (categories) => categories.parentCategory)
	@Field(() => [Category])
	categories: Category[]
}

@InputType()
export class NewParentCategoryInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field()
	name: string
}

@InputType()
export class UpdateParentCategoryInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field({ nullable: true })
	name?: string
}

export default ParentCategory
