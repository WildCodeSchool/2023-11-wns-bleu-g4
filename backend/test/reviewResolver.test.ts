import getAllReviews from "./operations/getAllReviews"
import { execute } from "../jest.setup"

import createReview from "./operations/createReview"
import getCustomerContext from "./helpers/getCustomerContext"
import { CreateBookings } from "./helpers/bookedProduct"
import getCustomerJWT from "./helpers/getCustomerJWT"

describe("GetAllReviews", () => {
	it("should display all reviews", async () => {
		/*await Review.create({
      rate: 4,
      comment: "Good product, I recommend it!",
      createdAt: "2024-10-06T15:05:08.339Z",
      edited: false,
    }).save()
    await Review.create({
      rate: 1,
      comment: "Bad product, I don't recommend it!",
      createdAt: "2024-11-06T15:05:08.339Z",
                       edited: false,
    }).save()*/

		const res = await execute(getAllReviews)
		expect(res).toMatchInlineSnapshot(`
		{
		  "data": {
		    "getAllReviews": [],
		  },
		}
	`)
	})

	it("user can add review", async () => {
		const { customer } = await getCustomerJWT()
		await CreateBookings(customer.id)

		const res = await execute(
			createReview,
			{
				data: {
					userId: customer.id,
					product: { id: 1 },
					rate: 5,
					comment: "I love this product!",
				},
			},
			await getCustomerContext()
		)

		expect(res).toMatchInlineSnapshot()
	})

	it("user cannot add a review on a product not yet booked", async () => {
		const res = await execute(
			createReview,
			{
				data: {
					userId: {
						id: 1,
					},
					product: {
						id: 1,
					},
					rate: 5,
					comment: "I love this product!",
				},
			},
			await getCustomerContext()
		)
		expect(res).toMatchInlineSnapshot(`
		{
		  "data": null,
		  "errors": [
		    [GraphQLError: You cannot review a product you have not booked],
		  ],
		}
	`)
	})
})
