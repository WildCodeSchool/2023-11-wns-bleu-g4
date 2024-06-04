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
import { BookingItem } from "../entities/BookingItem"

@Resolver()
class BookingItemResolver {
    @Query(() => [BookingItem])
    async getBookingItems() {
        return BookingItem.find()
    }

    @Query(() => [BookingItem])
    async getBookingItemsBy(
        @Arg ("bookingId") bookingId: number
    ) {
        const items = await BookingItem.find({
            where : {booking : {
                id : bookingId
            }},
            relation : {booking : true, product:true}
        })
    }


}


export default BookingItemResolver;