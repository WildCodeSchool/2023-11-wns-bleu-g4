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
import { ILike } from "typeorm"

@Resolver()
class BookingResolver {
	@Query(() => BookingList)
	async getAllBooking(
		@Arg("bookingId", () => Int, { nullable: true }) bookingId?: number,
		@Arg("agencyId", () => Int, { nullable: true }) agencyId?: number,
		@Arg("userName", () => String, { nullable: true }) userName?: string,
		@Arg("userFirstname", () => String, { nullable: true }) userFirstname?: string,
		@Arg("limit", () => Int, { nullable: true }) limit?: number,
		@Arg("offset", () => Int, { nullable: true }) offset?: number
	) {
		const whereConditions: any = []
		if (bookingId) whereConditions.push({ id: bookingId })
		if (agencyId) whereConditions.push({ agency: { id: agencyId } })
		if (userName) whereConditions.push({ user: { name: ILike(`%${userName.toLowerCase()}%`) } })
		if (userFirstname) whereConditions.push({ user: { firstname: ILike(`%${userFirstname.toLowerCase()}%`) } })

		const [bookings, total] = await Booking.findAndCount({
			relations: { user: true, agency: true, bookingItem: true },
			where: whereConditions.length ? whereConditions : undefined,
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
			relations: { agency: true, user: true, bookingItem: true },
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
	@Query(() => BookingList)
	async getBookingsByUserId(
		@Arg("limit", () => Int, { nullable: true }) limit?: number,
		@Arg("offset", () => Int, { nullable: true }) offset?: number,
		@Ctx() ctx?: Context
	) {
		const [bookings, total] = await Booking.findAndCount({
			relations: { agency: true, user: true, bookingItem: true },
			where: { user: { id: ctx?.currentUser?.id } },
			take: limit,
			skip: offset,
			order: {
				bookingDate: "DESC",
			},
		})

		if (!bookings) throw new GraphQLError("Booking Not found")

		return { bookings, total }
	}

	@Authorized()
	@Mutation(() => [Booking]) // Retourne un tableau de Booking
	async createBooking(@Arg("data", () => [NewBookingInput]) data: NewBookingInput[], @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const bookings = []

		for (const bookingData of data) {
			const startDate = new Date(bookingData.startDate)
			const endDate = new Date(bookingData.endDate)

			const product = await Product.findOne({ where: { id: bookingData.productId } })
			if (!product) throw new GraphQLError("Product not found")

			// Vérification de la disponibilité pour la quantité et la taille demandées
			const availableProductCodes = await ProductCode.checkAvailability(
				bookingData.productId,
				startDate,
				endDate,
				bookingData.quantity,
				bookingData.size
			)

			if (!availableProductCodes || availableProductCodes.length < bookingData.quantity) {
				throw new GraphQLError("Not enough available Product Codes found for the specified dates and size")
			}

			const newBooking = new Booking()
			Object.assign(newBooking, bookingData)
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

			const savedBooking = await Booking.findOne({
				where: { id: newBooking.id },
				relations: { user: true, agency: true, bookingItem: true },
			})

			bookings.push(savedBooking)
		}

		return bookings
	}

	@Authorized()
	@Mutation(() => Booking)
	async updateBooking(
		@Arg("bookingId", () => Int) id: number,
		@Arg("data", { validate: true }) data: UpdateBookingInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const bookingToUpdate = await Booking.findOne({ where: { id }, relations: ["bookingItem"] })
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
			relations: { user: true, agency: true, bookingItem: true },
		})
	}

	@Authorized()
	@Mutation(() => String)
	async cancelBooking(@Arg("bookingId", () => Int) bookingId: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const bookingToCancel = await Booking.findOne({
			where: { id: bookingId },
			relations: { user: true, agency: true, bookingItem: true },
		})

		if (!bookingToCancel) throw new GraphQLError("Booking not found")

		const currentDate = new Date()
		if (currentDate > bookingToCancel.startDate) {
			throw new GraphQLError("Cannot cancel booking after the start date")
		}

		if (bookingToCancel.user.id !== ctx.currentUser.id && !ctx.currentUser.role.includes("admin")) {
			throw new GraphQLError("Not authorized to cancel this booking")
		}

		bookingToCancel.status = StatusBooking.CANCELED

		await bookingToCancel.save()

		await mailer.sendMail({
			from: env.EMAIL_FROM,
			to: bookingToCancel.user.email,
			subject: "Booking Cancellation Confirmation",
			text: `Hello ${bookingToCancel.user.name} ${bookingToCancel.user.firstname},\n\nYour booking with ID ${bookingToCancel.id} has been successfully cancelled.\n\nBest regards,\nGear Go`,
		})

		return "Booking canceled"
	}
}

export default BookingResolver
