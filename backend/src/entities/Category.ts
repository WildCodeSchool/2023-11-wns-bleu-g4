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
import { Field, InputType, Int, ObjectType } from "type-graphql"
import Product from "./Product"
import ParentCategory from "./ParentCategory"
import { Length } from "class-validator"
import { ParentCategoryId } from "../types"

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

	@Field(() => ParentCategoryId, { nullable: true })
	parentCategory?: ParentCategoryId
}

export default Category
