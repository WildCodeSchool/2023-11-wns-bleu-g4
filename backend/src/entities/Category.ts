import { Field, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
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

	@OneToMany(() => Product, (product) => product.category)
	products: Product[]
}

export default Category
