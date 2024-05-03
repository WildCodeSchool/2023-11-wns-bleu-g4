import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import Product from "./Product"
import SubCategory from "./SubCategory"
import { Length } from "class-validator"

@Entity()
@ObjectType()
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column()
	@Field()
	name: string

	@ManyToMany(() => Product, (product) => product.categories)
	@Field(() => [Product])
	products: Product[]

	@OneToMany(() => SubCategory, (subCategories) => subCategories.category)
	@Field(() => [SubCategory])
	subCategories: SubCategory[]
}

@InputType()
export class NewCategoryInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field()
	name: string
}

@InputType()
export class UpdateCategoryInput {
	@Field({ nullable: true })
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	name?: string
}

export default Category
