import { Length } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ParentCategoryId } from "../types"
import ParentCategory from "./ParentCategory"
import Product from "./Product"

@Entity()
@ObjectType()
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	name: string

	@Column({ default: "default_thumbnail.jpg" })
	@Field()
	thumbnail: string

	@OneToMany(() => Product, (products) => products.category)
	@Field(() => [Product])
	products: Product[]

	@ManyToOne(() => ParentCategory, (parentCategory) => parentCategory.categories, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => ParentCategory)
	parentCategory: ParentCategory
}

@InputType()
export class NewCategoryInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field()
	name: string

	@Field()
	thumbnail: string

	@Field(() => ParentCategoryId, { nullable: true })
	parentCategory?: ParentCategoryId
}

@InputType()
export class UpdateCategoryInput {
	@Field({ nullable: true })
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	name?: string

	@Field({ nullable: true })
	thumbnail?: string

	@Field(() => ParentCategoryId, { nullable: true })
	parentCategory?: ParentCategoryId
}

export default Category
