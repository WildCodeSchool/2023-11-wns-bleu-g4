import { execute } from "../jest.setup"
import ParentCategory from "../src/entities/ParentCategory"
import addParentCategory from "./operations/addParentCategory"
import getParentCategories from "./operations/getParentCategories"
import getAdminContext from "./helpers/getAdminContext"

describe("ParentCategoryResolver", () => {
	it("should read parentCategories", async () => {
		await ParentCategory.create({ name: "Parent Category 1" }).save()
		await ParentCategory.create({ name: "Parent Category 2" }).save()
		const res = await execute(getParentCategories)

		expect(res).toEqual({
			data: {
				getAllParentCategories: [
					{ id: 2, name: "Parent Category 2" },
					{ id: 1, name: "Parent Category 1" },
				],
			},
		})
	})

	it("should create a parent category with admin jwt", async () => {
		const res = await execute(
			addParentCategory,
			{
				data: {
					name: "Parent Category 1",
				},
			},
			await getAdminContext()
		)

		expect(res).toEqual({
			data: {
				createParentCategory: {
					name: "Parent Category 1",
				},
			},
		})

		const parentCategoryInDB = await ParentCategory.findOne({ where: { name: "Parent Category 1" } })
		expect(parentCategoryInDB).toEqual(
			expect.objectContaining({
				id: expect.any(Number),
				name: "Parent Category 1",
			})
		)
	})

	it("should not create a parent category without admin jwt", async () => {
		const context = {
			req: {
				headers: {},
				cookies: {},
			},
		}

		const res = await execute(
			addParentCategory,
			{
				data: {
					name: "Parent Category 1",
				},
			},
			context
		)

		expect(res).toEqual({
			data: null,
			errors: [
				expect.objectContaining({
					message: "Access denied! You don't have permission for this action!",
				}),
			],
		})
	})
})
