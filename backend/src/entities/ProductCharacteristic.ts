import { Field, InputType, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProductId } from "../types"
import Product from "./Product"

@Entity()
@ObjectType()
export class ProductCharacteristic extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number

    @Column()
    @Field()
    characteristic: string

    @ManyToMany(() => Product, product => product.characteristics)
    @Field(() => Product)
    product: Product
}


@InputType()
export class newProductCharacteristicInput {
    @Field()
    characteristic: string

    @Field(() => ProductId)
    productId: ProductId
}

@InputType()
export class updateProductCharacteristicInput {
    @Field(() => Int)
    id: number

    @Field()
    characteristic: string
}

export default ProductCharacteristic