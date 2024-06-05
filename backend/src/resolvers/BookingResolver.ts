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
import { Booking, CancelBookingInput, NewBookingInput, UpdateBookingInput } from "../entities/Booking"
import { StatusBooking } from "../enum/StatusBooking"

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

    @Query(() => [Booking])
    async getBookingsByUser(
        @Arg("userId", () => Int) userId: number) {

        const bookings = await Booking.find({
            relations: { user: true, agency: true },
            where: {
                user: {
                    id: userId
                }
            }
        })

        if (!bookings) throw new GraphQLError("Booking Not found")

        return bookings
    }

    @Mutation(() => Booking)
    async createBooking(
        @Arg("data", { validate: true }) data: NewBookingInput, @Ctx() ctx: Context) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

        const newBooking = new Booking()
        Object.assign(newBooking, data)
        const { id } = await newBooking.save()

        return Booking.findOne({
            where: { id },
            relations: { user: true, agency: true }
        })
    }

    @Mutation(() => Booking)
    async updateBooking(
        @Arg("bookingId") id: number,
        @Arg("data", { validate: true }) data: UpdateBookingInput,
        @Ctx() ctx: Context
    ) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

        const bookingToUpdate = await Booking.findOne({ where: { id } })
        if (!bookingToUpdate) throw new GraphQLError("Booking not found")

        Object.assign(bookingToUpdate, data)
        await bookingToUpdate.save()

        return Booking.findOne({
            where: { id },
            relations: { user: true, agency: true },
        })
    }

    @Mutation(() => String)
    async cancelBooking(
        @Arg("bookingId") id: number,
        @Ctx() ctx: Context
    ) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

        const data: CancelBookingInput = { status: StatusBooking.CANCELED }

        const bookingToCancel = await Booking.findOne({ where: { id } })
        if (!bookingToCancel) throw new GraphQLError("Booking not found")

        Object.assign(bookingToCancel, data)
        await bookingToCancel.save()

        return "Booking cancelled"
    }

}

export default BookingResolver;