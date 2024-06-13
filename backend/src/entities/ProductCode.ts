import { IsEnum } from "class-validator"
import { Field, InputType, Int, ObjectType } from "type-graphql"
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
import { AgencyId, ProductId } from "../types"
import { BookingItemStatus } from "../enum/BookingItemStatus"

@Entity()
@ObjectType()
export class Product_code extends BaseEntity {
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
	@Field(() => [BookingItem], { nullable: true })
	bookingItems: BookingItem[]

	static async checkAvailability(productId: number, startDate: Date, endDate: Date): Promise<Product_code | null> {
		const productCodes = await this.find({ where: { product: { id: productId }, status: Status.AVAILABLE } });

		for (const productCode of productCodes) {
			const overlappingBookings = await BookingItem.find({
				where: {
					productCode: { id: productCode.id },
					startDate: LessThanOrEqual(endDate),
					endDate: MoreThanOrEqual(startDate),
					status: Not(BookingItemStatus.CANCELED)
				}
			});

			if (overlappingBookings.length === 0) {
				return productCode;
			}
		}

		return null;
	}
}

@InputType()
export class NewProductCodeInput {
	@Field(() => Status)
	status: Status

	@Field(() => ProductId)
	productId: ProductId

	@Field(() => AgencyId)
	agencyId: AgencyId
}

@InputType()
export class ProductCodeStatusInput {
	@Field(() => Status)
	status: Status
}


export default Product_code
