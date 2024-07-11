import { GraphQLError } from "graphql"
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import { Booking, NewBookingInput, UpdateBookingInput } from "../entities/Booking"
import { BookingItem } from "../entities/BookingItem"
import Product from "../entities/Product"
import ProductCode from "../entities/ProductCode"
import { BookingItemStatus } from "../enum/BookingItemStatus"
import { StatusBooking } from "../enum/StatusBooking"
import { Context } from "../utils"
import { BookingList } from "../types"
import mailer from "../mailer"
import env from "../env"

@Resolver()
class BookingResolver {
	@Query(() => BookingList)
	async getAllBooking(
		@Arg("agencyId", { nullable: true }) agencyId?: number,
		@Arg("userId", { nullable: true }) userId?: number,
		@Arg("limit", () => Int, { nullable: true }) limit?: number,
		@Arg("offset", () => Int, { nullable: true }) offset?: number
	) {
		const [bookings, total] = await Booking.findAndCount({
			relations: { user: true, agency: true, bookingItem: true },
			where: {
				...(agencyId && { agency: { id: agencyId } }),
				...(userId && { user: { id: userId } }),
			},
			take: limit,
			skip: offset,
		})

		return { bookings, total }
	}

	@Query(() => Booking)
	async getBookingById(@Arg("bookingId", () => Int) id: number) {
		const booking = await Booking.findOne({
			relations: { user: true, agency: true, bookingItem: true },
			where: { id },
		})

		if (!booking) throw new GraphQLError("Booking Not found")

		return booking
	}

	@Query(() => [Booking])
	async getBookingsByUser(@Arg("userId", () => Int) userId: number) {
		const bookings = await Booking.find({
			relations: { user: true, agency: true, bookingItem: true },
			where: {
				user: {
					id: userId,
				},
			},
		})

		if (!bookings) throw new GraphQLError("Booking Not found")

		return bookings
	}

	@Authorized()
	@Mutation(() => Booking)
	async createBooking(@Arg("data") data: NewBookingInput, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const startDate = new Date(data.startDate)
		const endDate = new Date(data.endDate)

		const product = await Product.findOne({ where: { id: data.productId } })
		if (!product) throw new GraphQLError("Product not found")

		// Vérification de la disponibilité pour la quantité et la taille demandées
		const availableProductCodes = await ProductCode.checkAvailability(
			data.productId,
			startDate,
			endDate,
			data.quantity,
			data.size
		)

		if (!availableProductCodes || availableProductCodes.length < data.quantity) {
			throw new GraphQLError("Not enough available Product Codes found for the specified dates and size")
		}

		const newBooking = new Booking()
		Object.assign(newBooking, data)
		newBooking.status = StatusBooking.BOOKED
		await newBooking.save()

		const bookingItems = []
		for (const productCode of availableProductCodes) {
			const bookingItem = new BookingItem()
			bookingItem.status = BookingItemStatus.RENTED
			bookingItem.booking = newBooking
			bookingItem.product = product
			bookingItem.productCode = productCode
			bookingItem.startDate = startDate
			bookingItem.endDate = endDate
			await bookingItem.save()
			bookingItems.push(bookingItem)
		}

		newBooking.bookingItem = bookingItems
		await newBooking.save()

		return Booking.findOne({
			where: { id: newBooking.id },
			relations: { user: true, agency: true, bookingItem: true },
		})
	}

	@Authorized()
	@Mutation(() => Booking)
	async updateBooking(
		@Arg("bookingId") id: number,
		@Arg("data", { validate: true }) data: UpdateBookingInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const bookingToUpdate = await Booking.findOne({
			where: { id },
			relations: { user: true, agency: true, bookingItem: true },
		})
		if (!bookingToUpdate) throw new GraphQLError("Booking not found")

		Object.assign(bookingToUpdate, data)

		if (data.status === StatusBooking.CANCELED) {
			bookingToUpdate.status = StatusBooking.CANCELED
			for (const item of bookingToUpdate.bookingItem) {
				item.status = BookingItemStatus.CANCELED
				await item.save()
			}
		}

		await bookingToUpdate.save()
		return Booking.findOne({
			where: { id },
			relations: { user: true, agency: true },
		})
	}

	@Authorized()
	@Mutation(() => String)
	async cancelBooking(@Arg("bookingId") id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const bookingToCancel = await Booking.findOne({
			where: { id },
			relations: { user: true, agency: true, bookingItem: true },
		})

		if (!bookingToCancel) throw new GraphQLError("Booking not found")

		if (bookingToCancel.user.id !== ctx.currentUser.id && !ctx.currentUser.role.includes("admin")) {
			throw new GraphQLError("Not authorized to cancel this booking")
		}

		bookingToCancel.status = StatusBooking.CANCELED

		for (const item of bookingToCancel.bookingItem) {
			item.status = BookingItemStatus.CANCELED
			await item.save()
		}

		await bookingToCancel.save()

		await mailer.sendMail({
			from: env.EMAIL_FROM,
			to: bookingToCancel.user.email,
			subject: "Booking Cancellation Confirmation",
			text: `Hello ${bookingToCancel.user.name} ${bookingToCancel.user.firstname},\n\nYour booking with ID 
			${bookingToCancel.id} has been successfully cancelled.\n\nBest regards,\nGear Go`,
		})

		return "Booking cancelled"
	}
}

export default BookingResolver
