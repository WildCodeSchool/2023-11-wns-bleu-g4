import { Field, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
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

	@ManyToMany(() => Product, (product) => product.categories)
	products: Product[]
}

export default Category
