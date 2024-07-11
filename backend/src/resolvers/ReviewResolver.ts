import { GraphQLError } from "graphql"
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import { Context } from "vm"
import { NewReviewInput, Review, UpdateReviewInput } from "../entities/Review"
import { UserRole } from "../entities/User"

@Resolver()
export class ReviewResolver {
	@Query(() => [Review])
	async getAllReviews(
		@Arg("userId", () => Int, { nullable: true }) userId?: number,
		@Arg("productId", () => Int, { nullable: true }) productId?: number,
	) {
		const where: any = {};

		if (userId !== undefined) {
			where.user = { id: userId };
		}

		if (productId !== undefined) {
			where.product = { id: productId };
		}

		return await Review.find({
			where,
			relations: ["user", "product"],
		});
	}

	@Query(() => Review)
	async getReviewById(
		@Arg("reviewId", () => Int) id: number,
		@Arg("userId", () => Int, { nullable: true }) userId?: number,
		@Arg("productId", () => Int,{ nullable: true }) productId?: number,
	) {
		const review = await Review.findOne({
			relations: { user: true, product: true },
			where: { id }
		})

		if (!review) throw new GraphQLError("Not found")

		return review
	}

	@Query(() => [Review])
	async getReviewsByProductId(
		@Arg("productId", () => Int) productId: number,
		@Arg("userId",() => Int, { nullable: true }) userId?: number,
	) {
		const reviews = await Review.find({
			relations: { user: true, product: true },
			where: { product: { id: productId } }
		})

		if (!reviews) throw new GraphQLError("Not found")

		return reviews
	}

	@Query(() => [Review])
	async getReviewsByUserId(
		@Arg("userId", () => Int) userId: number,
		@Arg("productId", () => Int, { nullable: true }) productId?: number,
	) {
		const reviews = await Review.find({
			relations: { user: true, product: true },
			where: { user: { id: userId } }
		})

		if (!reviews) throw new GraphQLError("Not found")

		return reviews
	}

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
		@Ctx() ctx: Context,
		@Arg("reviewId", () => Int) id: number,
		@Arg("data", { validate: true, nullable: true }) data?: UpdateReviewInput,
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
	async deleteReview(@Arg("reviewId", () => Int) id: number, @Ctx() ctx: Context) {
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
