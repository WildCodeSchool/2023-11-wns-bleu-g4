import { GraphQLError } from "graphql"
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import { NewReviewInput, Review, UpdateReviewInput } from "../entities/Review"
import { UserRole } from "../entities/User"
import { Booking } from "../entities/Booking"
import { Context } from "../utils"

@Resolver()
export class ReviewResolver {
	@Query(() => [Review])
	async getAllReviews(
		@Arg("userId", { nullable: true }) userId?: number,
		@Arg("productId", { nullable: true }) productId?: number
	) {
		const where: any = {}

		if (userId !== undefined) {
			where.user = { id: userId }
		}

		if (productId !== undefined) {
			where.product = { id: productId }
		}

		return await Review.find({
			where,
			relations: ["user", "product"],
		})
	}

	@Query(() => Review)
	async getReviewById(
		@Arg("reviewId", () => Int) id: number,
		@Arg("userId", { nullable: true }) userId?: number,
		@Arg("productId", { nullable: true }) productId?: number
	) {
		const review = await Review.findOne({
			relations: { user: true, product: true },
			where: { id },
		})

		if (!review) throw new GraphQLError("Not found")

		return review
	}

	@Query(() => [Review])
	async getReviewsByProductId(@Arg("productId") productId: number, @Arg("userId", { nullable: true }) userId?: number) {
		const reviews = await Review.find({
			relations: { user: true, product: true },
			where: { product: { id: productId } },
		})

		if (!reviews) throw new GraphQLError("Not found")

		return reviews
	}

	@Query(() => [Review])
	async getReviewsByUserId(
		@Arg("userId", () => Int) userId: number,
		@Arg("productId", { nullable: true }) productId?: number
	) {
		const where: any = {
			user: { id: userId },
		}

		if (productId !== undefined) {
			where.product = { id: productId }
		}

		const reviews = await Review.find({
			relations: { user: true, product: true },
			where,
		})

		if (!reviews.length) throw new GraphQLError("Not found")

		return reviews
	}

	@Authorized([UserRole.CUSTOMER])
	@Query(() => Boolean)
	async hasUserBookedProduct(
		@Arg("userId", () => Int) userId: number,
		@Arg("productId", () => Int) productId: number,
		@Ctx() ctx: Context
	): Promise<boolean> {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const booking = await Booking.findOne({
			where: {
				user: { id: userId },
				bookingItem: { product: { id: productId } },
			},
			relations: ["bookingItem"],
		})

		return !!booking
	}

	@Authorized([UserRole.CUSTOMER])
	@Mutation(() => Review)
	async createReview(@Arg("data", { validate: true }) data: NewReviewInput, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const hasBookedProduct = await Booking.findOne({
			where: {
				user: { id: ctx.currentUser.id },
				bookingItem: { product: { id: data.product.id } },
			},
			relations: ["bookingItem"],
		})

		if (!hasBookedProduct) {
			throw new GraphQLError("You cannot review a product you have not booked")
		}

		const existingReview = await Review.findOne({
			where: {
				user: { id: ctx.currentUser.id },
				product: { id: data.product.id },
			},
		})

		if (existingReview) {
			throw new GraphQLError("You have already reviewed this product")
		}

		const newReview = new Review()

		if (ctx.currentUser.role !== UserRole.CUSTOMER) throw new GraphQLError("Not authorized")

		Object.assign(newReview, data)
		newReview.user = ctx.currentUser

		const { id } = await newReview.save()
		return Review.findOne({
			where: { id },
			relations: { product: true, user: true },
		})
	}

	@Authorized([UserRole.CUSTOMER])
	@Mutation(() => Review)
	async updateReview(
		@Ctx() ctx: Context,
		@Arg("reviewId", () => Int) id: number,
		@Arg("data", { validate: true, nullable: true }) data?: UpdateReviewInput
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const reviewToUpdate = await Review.findOne({ where: { id }, relations: ["user"] })
		if (!reviewToUpdate) throw new GraphQLError("Review not found")

		if (ctx.currentUser.role !== UserRole.CUSTOMER) throw new GraphQLError("Not authorized")

		if (reviewToUpdate.user.id !== ctx.currentUser.id) throw new GraphQLError("Only the creator can update the review")

		if (data?.comment) {
			reviewToUpdate.edited = true
		}

		Object.assign(reviewToUpdate, data)
		await reviewToUpdate.save()

		return Review.findOne({
			where: { id },
			relations: { product: true, user: true },
		})
	}

	@Authorized([UserRole.CUSTOMER])
	@Mutation(() => String)
	async deleteReview(@Arg("reviewId", () => Int) id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")

		const reviewToDelete = await Review.findOne({ where: { id }, relations: ["user"] })
		if (!reviewToDelete) throw new GraphQLError("Review not found")

		if (ctx.currentUser.role !== UserRole.CUSTOMER) throw new GraphQLError("Not authorized")

		if (reviewToDelete.user.id !== ctx.currentUser.id) throw new GraphQLError("Only the creator can delete the review")

		await reviewToDelete.remove()
		return "Review deleted"
	}
}
