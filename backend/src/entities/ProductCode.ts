import {
	BaseEntity,
	Column,
	Entity,
	LessThanOrEqual,
	ManyToOne,
	MoreThanOrEqual,
	Not,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { Status } from "../enum/StatusProductCode"
import { Agency } from "./Agency"
import { Product } from "./Product"
import { BookingItem } from "./BookingItem"
import { IsEnum } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
import { BookingItemStatus } from "../enum/BookingItemStatus"

@Entity()
@ObjectType()
export class ProductCode extends BaseEntity {
	/** COLUMNS *********************/
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

	@Column({
		type: "enum",
		enum: Status,
	})
	@Field(() => Status)
	@IsEnum(Status)
	status: Status

	@Column({ type: "boolean", default: false })
	@Field(() => Boolean)
	isSizeable: boolean

	@Column({ nullable: true })
	@Field({ nullable: true })
	size?: string

	/** RELATIONS *********************/
	/** MANY TO ONE */
	@ManyToOne(() => Product, (product) => product.productCodes, {
		eager: true,
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => Product, { nullable: true })
	product: Product

	@ManyToOne(() => Agency, (agency) => agency.productCodes, {
		eager: true,
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => Agency, { nullable: true })
	agency: Agency

	/** ONE TO MANY */
	@OneToMany(() => BookingItem, (item) => item.productCode, {
		eager: true,
		cascade: true,
		onDelete: "CASCADE",
	})
	@Field(() => [BookingItem])
	bookingItems: BookingItem[]

	/** METHODS *********************/

	static async checkAvailability(
		productId: number,
		startDate: Date,
		endDate: Date,
		quantity: number,
		size?: string | number
	): Promise<ProductCode[] | null> {
		const availableProductCodes = []

		const productCodes = await this.find({
			where: { product: { id: productId }, status: Status.AVAILABLE, ...(size ? { size: size.toString() } : {}) },
		})

		for (const productCode of productCodes) {
			const overlappingBookings = await BookingItem.find({
				where: {
					productCode: { id: productCode.id },
					startDate: LessThanOrEqual(endDate),
					endDate: MoreThanOrEqual(startDate),
					status: Not(BookingItemStatus.CANCELED),
				},
			})

			if (overlappingBookings.length === 0) {
				availableProductCodes.push(productCode)
				if (availableProductCodes.length === quantity) return availableProductCodes
			}
		}

		return null
	}
}

@InputType()
export class NewProductCodeInput {
	@Field(() => Status)
	status: Status

	@Field(() => Int)
	productId: number

	@Field(() => Int)
	agencyId: number

	@Field(() => Boolean, { defaultValue: false })
	isSizeable: boolean

	@Field(() => String, { nullable: true })
	size?: string
}

@InputType()
export class ProductCodeStatusInput {
	@Field(() => Status)
	status: Status
}

export default ProductCode
