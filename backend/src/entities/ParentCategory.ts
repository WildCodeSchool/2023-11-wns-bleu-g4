import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm"
import { Length } from "class-validator"

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

	@Column()
	@Field()
	thumbnail: string
}

@InputType()
export class NewParentCategoryInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field()
	name: string

	@Field()
	thumbnail: string
}

@InputType()
export class UpdateParentCategoryInput {
	@Length(3, 50, { message: "Le nom doit contenir entre 3 et 50 caractères" })
	@Field({ nullable: true })
	name?: string

	@Field({ nullable: true })
	thumbnail?: string
}

export default ParentCategory
