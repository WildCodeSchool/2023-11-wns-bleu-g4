import { Field, Int, ObjectType } from "type-graphql"
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
	products: Product[]

	@OneToMany(() => SubCategory, (subCategories) => subCategories.category)
	subCategories: SubCategory[]
}

export default Category
