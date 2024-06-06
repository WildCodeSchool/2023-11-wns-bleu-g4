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
import {
	Booking,
	NewBookingInput,
	UpdateBookingInput,
} from "../entities/Booking"
import Product_code from "../entities/Product_code"
import { UserRole } from "../entities/User"
import { Status } from "../enum/Status"
import { StatusBooking } from "../enum/StatusBooking"
import { Context } from "../utils"

@Resolver()
class BookingResolver {
	@Query(() => [Booking])
	async getAllBooking(
		@Arg("agencyId", { nullable: true }) agencyId?: number,
		@Arg("userId", { nullable: true }) userId?: number
	) {
		return Booking.find({
			relations: { user: true, agency: true, product_code: true },
			where: {
				agency: { id: agencyId },
				user: { id: userId },
			},
		})
	}

	@Query(() => Booking)
	async getBookingById(@Arg("bookingId", () => Int) id: number) {
		const booking = await Booking.findOne({
			relations: { user: true, agency: true, product_code: true },
			where: { id },
		})

		if (!booking) throw new GraphQLError("Booking Not found")

		return booking
	}

	@Query(() => [Booking])
	async getBookingsByUser(@Arg("userId", () => Int) userId: number) {
		const bookings = await Booking.find({
			relations: { user: true, agency: true, product_code: true },
			where: {
				user: {
					id: userId,
				},
			},
		})

		if (!bookings) throw new GraphQLError("Booking Not found")

		return bookings
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Booking)
	async createBooking(
		@Arg("data", { validate: true }) data: NewBookingInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		// Vérifier la disponibilité du produit
		const productCode = await Product_code.createQueryBuilder("pc")
			.innerJoin("pc.product", "p")
			.innerJoin("pc.agency", "a")
			.where("p.id = :productId", { productId: data.productId })
			.andWhere("pc.status = :status", { status: Status.AVAILABLE })
			.andWhere("a.id = :agencyId", { agencyId: data.agency })
			.andWhere("pc.id = :product_code", { product_code: data.product_code })
			.getOne()

		if (!productCode) {
			throw new GraphQLError("Product not available for booking")
		}

		// Vérifier si la taille est requise seulement si isSizeable est true
		if (productCode.isSizeable) {
			if (!data.size) {
				throw new GraphQLError("Size is required for this product")
			}

			// Vérifier si la taille correspond
			if (productCode.size !== data.size) {
				throw new GraphQLError(
					"The specified size does not match the available product size"
				)
			}
		}

		// Créer la réservation
		const newBooking = new Booking()
		newBooking.product_code = productCode
		Object.assign(newBooking, data)
		const { id } = await newBooking.save()

		// Mettre à jour le statut du code de produit associé au produit sélectionné
		productCode.status = Status.BOOKED
		await productCode.save()

		return Booking.findOne({
			where: { id },
			relations: { user: true, agency: true, product_code: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Booking)
	async updateBooking(
		@Arg("bookingId") id: number,
		@Arg("data", { validate: true }) data: UpdateBookingInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const bookingToUpdate = await Booking.findOne({
			where: { id },
			relations: { product_code: true },
		})

		if (!bookingToUpdate) throw new GraphQLError("Booking not found")

		// Vérifier la disponibilité du produit
		const productCode = await Product_code.createQueryBuilder("pc")
			.innerJoin("pc.product", "p")
			.innerJoin("pc.agency", "a")
			.where("p.id = :productId", { productId: data.productId })
			.andWhere("pc.status = :status", { status: Status.AVAILABLE })
			.andWhere("a.id = :agencyId", { agencyId: data.agency })
			.getOne()

		if (!productCode) {
			throw new GraphQLError("Product not available for booking")
		}

		// Vérifier si la taille est requise seulement si isSizeable est true
		if (productCode.isSizeable) {
			if (!data.size) {
				throw new GraphQLError("Size is required for this product")
			}

			// Vérifier si la taille correspond
			if (productCode.size !== data.size) {
				throw new GraphQLError(
					"The specified size does not match the available product size"
				)
			}
		}

		Object.assign(bookingToUpdate, data)
		await bookingToUpdate.save()

		return Booking.findOne({
			where: { id },
			relations: { user: true, agency: true, product_code: true },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => String)
	async cancelBooking(@Arg("bookingId") id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const bookingToCancel = await Booking.findOne({
			where: { id },
			relations: { product_code: true },
		})

		if (!bookingToCancel) throw new GraphQLError("Booking not found")

		// Vérifier si le produit est associé à la réservation
		const productCode = bookingToCancel.product_code
		if (productCode) {
			// Mettre à jour le statut du produit comme disponible
			productCode.status = Status.AVAILABLE
			await productCode.save()
		}

		// Mettre à jour le statut de la réservation comme annulé
		bookingToCancel.status = StatusBooking.CANCELED
		await bookingToCancel.save()

		return "Booking cancelled"
	}
}

export default BookingResolver
