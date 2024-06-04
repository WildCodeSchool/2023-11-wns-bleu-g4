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
	@Field(() => String)
	name: string

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
    @Field(() => String)
	name: string

	@Field(() => Int)
	quantity: number

	@Field(() => Int)
    unit_price : number
}

@InputType()
export class UpdateBookingItemInput {
    @Field(() => String)
	name?: string

	@Field(() => Int)
	quantity?: number
    
	@Field(() => Int)
    unit_price?: number
}