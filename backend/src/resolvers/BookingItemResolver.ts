import { GraphQLError } from "graphql"
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from "type-graphql"
import { Context } from "../utils"
import { BookingItem, NewBookingItemInput, UpdateBookingItemInput } from "../entities/BookingItem"
import Product from "../entities/Product"
import { BookingId } from "../types"

@Resolver()
class BookingItemResolver {
    @Query(() => [BookingItem])
    async getBookingItems() {
        return BookingItem.find({
            relations: { booking: true, product: true }
        })
    }

    @Query(() => [BookingItem])
    async getBookingItemsByBookingId(
        @Arg("bookingId") bookingId: number,
    ) {
        const items = await BookingItem.find({
            where: {booking: { id: bookingId }},
            relations: { booking: true, product: true }
        })

        return items;
    }

    @Mutation(() => BookingItem)
    async createBookingItem(
        @Arg("data") data: NewBookingItemInput,
        @Ctx() ctx: Context
    ) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

        const newBookingItem = new BookingItem()
        Object.assign(newBookingItem, data)

        const { id } = await newBookingItem.save()

        return BookingItem.findOne({
            where: { id },
            relations: { booking: true }
        })
    }

    @Mutation(() => String)
    async updateBookingItem(
        @Arg("bookingItemId") id: number,
        @Arg("data", { validate: true }) data: UpdateBookingItemInput,
        @Ctx() ctx: Context
    ) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

        const itemToUpdate = await BookingItem.findOne({ where: { id } })
        if (!itemToUpdate) throw new GraphQLError("Item not found")

        Object.assign(itemToUpdate, data)

        await itemToUpdate.save()
        return `${itemToUpdate.product.name} updated`
    }

    @Mutation(() => String)
    async deleteBookingItem(@Arg("bookingItemId") id: number, @Ctx() ctx: Context) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

        const itemToDelete = await BookingItem.findOne({ where: { id }, relations :{product:true} })
        if (!itemToDelete) throw new GraphQLError("Item not found")

        await itemToDelete.remove()
        return `${itemToDelete.product.name} deleted`
    }
}

export default BookingItemResolver;