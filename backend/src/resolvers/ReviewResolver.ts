import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql"
import { Review } from "../entities/Review"
import { NewReviewInput, UpdateReviewInput } from "../entities/Review"
import { Context } from "vm"
import { GraphQLError } from "graphql"
import { UserRole } from "../entities/User"

@Resolver()
export class ReviewResolver {
	@Authorized([UserRole.CUSTOMER])
	@Mutation(() => Review)
	async createReview(
		@Arg("data", { validate: true }) data: NewReviewInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const newReview = new Review()

		if (ctx.currentUser.role !== UserRole.CUSTOMER)
			throw new GraphQLError("Not authorized")
		Object.assign(newReview, data)

		const { id } = await newReview.save()
		return Review.findOne({
			where: { id },
			relations: { product: true, user: true },
		})
	}

	@Authorized([UserRole.CUSTOMER])
	@Mutation(() => Review)
	async updateReview(
		@Arg("reviewId") id: number,
		@Arg("data", { validate: true }) data: UpdateReviewInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const reviewToUpdate = await Review.findOne({ where: { id } })
		if (!reviewToUpdate) throw new GraphQLError("Review not found")

		if (ctx.currentUser.role !== UserRole.CUSTOMER)
			throw new GraphQLError("Not authorized")
		if (reviewToUpdate.user.id !== ctx.currentUser.id)
			throw new GraphQLError("Only the creator can update the review")
		Object.assign(reviewToUpdate, data)

		await reviewToUpdate.save()
		return Review.findOne({
			where: { id },
			relations: { product: true, user: true },
		})
	}

	@Authorized([UserRole.CUSTOMER])
	@Mutation(() => String)
	async deleteReview(@Arg("reviewId") id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const reviewToDelete = await Review.findOne({ where: { id } })
		if (!reviewToDelete) throw new GraphQLError("Review not found")

		if (ctx.currentUser.role !== UserRole.CUSTOMER)
			throw new GraphQLError("Not authorized")
		if (reviewToDelete.user.id !== ctx.currentUser.id)
			throw new GraphQLError("Only the creator can delete the review")

		await reviewToDelete.remove()
		return "Review deleted"
	}
}
