import {
    Resolver,
    Query,
    Arg,
    Mutation,
    Int,
    Ctx,
} from "type-graphql"
import { GraphQLError } from "graphql"
import { Context } from "../utils"
import { Booking, NewBookingInput, UpdateBookingInput } from "../entities/Booking"


@Resolver()
class BookingResolver {
    @Query(() => [Booking])
    async getAllBooking(
        @Arg("agencyId", { nullable: true }) agencyId?: number,
        @Arg("userId", { nullable: true }) userId?: number
    ) {
        return Booking.find({
            relations: { user: true, agency: true },
            where: {
                agency: { id: agencyId },
                user: { id: userId }
            }
        })
    }

    @Query(() => Booking)
    async getBookingById(
        @Arg("bookingId", () => Int) id: number) {

        const booking = await Booking.findOne({
            relations: { user: true, agency: true },
            where: { id }
        })

        if (!booking) throw new GraphQLError("Booking Not found")

        return booking
    }

    @Mutation(() => Booking)
    async createBooking(
        @Arg("data", { validate: true }) data: NewBookingInput, @Ctx() ctx: Context) {
        // if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
        const newBooking = new Booking()

        Object.assign(newBooking, data)

        const { id } = await newBooking.save()

        return Booking.findOne({
            where: { id },
            relations: { user: true, agency: true }
        })
    }

    @Mutation(() => Booking)
    async cancelBooking(
        @Arg("bookingId", () => Int) id: number, @Ctx() ctx: Context) {
        // if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

        const booking = await Booking.findOne({
            relations: { user: true, agency: true },
            where: { id }
        })

        // const { id } = await newBooking.()

        return "ok"
    }
}

export default BookingResolver;