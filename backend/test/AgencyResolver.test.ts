import { execute } from "../jest.setup"
import Agency from "../src/entities/Agency"
import getAdminContext from "./helpers/getAdminContext"
import createAgency from "./operations/createAgency"
import GetAllAgenciesQuery from "./operations/getAllAgencies"
import deleteAgency from "./operations/deleteAgency"
import updateAgency from "./operations/updateAgency"
import getCustomerContext from "./helpers/getCustomerContext"
import { GraphQLError } from "graphql"
import getAgencyById from "./operations/getAgencyById"

async function createAgencies(qty: number) {
	for (let i = 0; i < qty; i++) {
		const number = i + 1
		await Agency.create({
			id: number,
			name: "agency" + number,
			address: "address" + number,
			postcode: "postcode" + number,
			city: "city" + number,
			country: "country" + number,
			phone: "phone" + number,
			email: "email" + number,
		}).save()
	}
}

describe("AgencyResolver", () => {
	it("should get all agencies", async () => {
		await createAgencies(2)
		const res = await execute(GetAllAgenciesQuery)
		expect(res.data).toEqual(
			{
				getAllAgencies: [
					{
						name: "agency2",
						address: "address2",
						postcode: "postcode2",
						city: "city2",
						country: "country2",
						phone: "phone2",
						email: "email2",
						id: 2,
					},
					{
						name: "agency1",
						address: "address1",
						postcode: "postcode1",
						city: "city1",
						country: "country1",
						phone: "phone1",
						email: "email1",
						id: 1,
					}
				]
			}
		)
	})

	it("should get an agency by id", async () => {

		await createAgencies(2)

		const res = await execute(getAgencyById, { agencyId: 1 })
		const agency: Agency = await res.data?.getAgencyById as Agency
		expect(agency).toEqual(
			{
				id: 1,
				name: "agency1",
			})
	})

	it("should not get an agency with wrong id", async () => {
		await createAgencies(1)

		const res = await execute(getAgencyById, { agencyId: 3 })
		const graphQLError = res.errors as GraphQLError[]
		expect(graphQLError[0].message).toBe("Agency Not found")
	})

	it("should create an agency as an admin", async () => {
		await execute(
			createAgency,
			{
				data: {
					name: "agency1",
					address: "address1",
					postcode: "postcode1",
					city: "city1",
					country: "country1",
					phone: "phone1",
					email: "email1",
				},
			},
			await getAdminContext()
		)

		const agencyInDB = await Agency.findOneBy({ id: 1 })
		expect(agencyInDB).toEqual({
			address: "address1",
			bookings: undefined,
			city: "city1",
			country: "country1",
			email: "email1",
			id: 1,
			name: "agency1",
			phone: "phone1",
			postcode: "postcode1",
			productCodes: undefined,
		})
	})

	it("should not create an agency if not admin", async () => {
		const res = await execute(
			createAgency,
			{
				data: {
					name: "agency1",
					address: "address1",
					postcode: "postcode1",
					city: "city1",
					country: "country1",
					phone: "phone1",
					email: "email1",
				}
			},
			await getCustomerContext()
		)

		const graphQLError = res.errors as GraphQLError[]
		expect(graphQLError[0].message).toBe("Access denied! You don't have permission for this action!")
	})

	it("should delete an agency as an admin", async () => {
		await createAgencies(1)

		const res = await execute(
			deleteAgency,
			{ agencyId: 1 },
			await getAdminContext()
		)
		expect(res.data?.deleteAgency).toBe("Agency deleted")
	})

	it("should not delete an agency if not admin", async () => {
		await createAgencies(1)

		const res = await execute(
			deleteAgency,
			{ agencyId: 1 },
			await getCustomerContext()
		)

		const graphQLError = res.errors as GraphQLError[]
		expect(graphQLError[0].message).toBe("Access denied! You don't have permission for this action!")
	})

	it("should update an agency as an admin", async () => {
		await createAgencies(1)

		let res = await execute(
			updateAgency,
			{
				agencyId: 1,
				data: {
					name: "new agency name"
				}
			},
			await getAdminContext()
		)

		let agencyUpdated: Agency = await res.data?.updateAgency as Agency
		expect(agencyUpdated.name).toBe("new agency name")
	})
})
