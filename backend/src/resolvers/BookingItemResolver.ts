import { GraphQLError } from "graphql"
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import { BookingItem, NewBookingItemInput, UpdateBookingItemInput } from "../entities/BookingItem"
import { Context } from "../utils"

@Resolver()
class BookingItemResolver {
	@Query(() => [BookingItem])
	async getBookingItems() {
		return BookingItem.find({
			relations: { booking: true, product: true, productCode: true },
		})
	}

    @Query(() => [BookingItem])
    async getBookingItemsByBookingId(
        @Arg("bookingId", () => Int) bookingId: number,
    ) {
        const items = await BookingItem.find({
            where: { booking: { id: bookingId } },
            relations: { booking: true, product: true, productCode: true }
        })

		return items
	}

	@Authorized()
	@Mutation(() => BookingItem)
	async createBookingItem(@Arg("data") data: NewBookingItemInput, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const newBookingItem = new BookingItem()
		Object.assign(newBookingItem, data)

		const { id } = await newBookingItem.save()

		return BookingItem.findOne({
			where: { id },
			relations: { booking: true, product: true, productCode: true },
		})
	}

    @Authorized()
    @Mutation(() => BookingItem)
    async updateBookingItem(
        @Arg("bookingItemId") id: number,
        @Arg("data", { validate: true }) data: UpdateBookingItemInput,
        @Ctx() ctx: Context
    ) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const itemToUpdate = await BookingItem.findOne({
			where: { id },
			relations: { booking: true, product: true, productCode: true },
		})
		if (!itemToUpdate) throw new GraphQLError("Item not found")

		Object.assign(itemToUpdate, data)

		await itemToUpdate.save()
		return itemToUpdate
	}

    @Authorized()
    @Mutation(() => String)
    async deleteBookingItem(@Arg("bookingItemId") id: number, @Ctx() ctx: Context) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const itemToDelete = await BookingItem.findOne({ where: { id } })
		if (!itemToDelete) throw new GraphQLError("Item not found")

		await itemToDelete.remove()
		return `${itemToDelete.product.name} deleted`
	}
}

export default BookingItemResolver;