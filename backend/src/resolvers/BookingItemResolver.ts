import { GraphQLError } from "graphql"
import {
    Arg,
    Authorized,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
} from "type-graphql"
import Agency, { NewAgencyInput, UpdateAgencyInput } from "../entities/Agency"
import { UserRole } from "../entities/User"
import { Context } from "../utils"
import { BookingItem, UpdateBookingItemInput } from "../entities/BookingItem"

@Resolver()
class BookingItemResolver {
    @Query(() => [BookingItem])
    async getBookingItems() {
        return BookingItem.find()
    }

    /** En attendant la validation de la PR de Booking */
    // @Query(() => [BookingItem])
    // async getBookingItemsByBookingId(
    //     @Arg ("bookingId") bookingId: number
    // ) {
    //     const items = await BookingItem.find({
    //         where : {booking : {
    //             id : bookingId
    //         }},
    //         relation : {booking:true, product:true}
    //     })
    // }

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

        return `${itemToUpdate.name} updated`

    }

    @Mutation(() => String)
    async deleteBookingItem(@Arg("bookingItemId") id: number, @Ctx() ctx: Context) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

        const itemToDelete = await BookingItem.findOne({ where: { id } })
        if (!itemToDelete) throw new GraphQLError("Item not found")

        await itemToDelete.remove()
        return `${itemToDelete.name} deleted`
    }

}


export default BookingItemResolver;