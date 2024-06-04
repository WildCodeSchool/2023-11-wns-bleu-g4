import { Field, InputType, Int, ObjectType } from "type-graphql"
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import Product from "./Product"

@Entity()
@ObjectType()
export class BookingItem extends BaseEntity {

    @PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number

    @Column()
	@Field(() => Int)
	quantity: number
    
    @Column()
	@Field(() => Int)
    unit_price : number

    // @OneToOne(() => Booking)
    // @JoinColumn()
	// @Field(() => Booking)
	// booking: Booking

    @OneToOne(() => Product)
    @JoinColumn()
	@Field(() => Product)
	product: Product
}

@InputType()
export class NewBookingItemInput {
	@Field(() => Int)
	quantity: number

	@Field(() => Int)
    unit_price : number

	@Field(() => Int)
    booking: number

	@Field(() => Int, {nullable : true})
    product :number
}

@InputType()
export class UpdateBookingItemInput {
	@Field(() => Int)
	quantity?: number
    
	@Field(() => Int)
    unit_price?: number

	@Field(() => Int)
    booking?: number

	@Field()
    product?:number
}