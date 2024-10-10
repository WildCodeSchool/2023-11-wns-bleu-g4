import { execute } from "../jest.setup"
import Agency from "../src/entities/Agency"
import getAdminContext from "./helpers/Contexts/getAdminContext"
import createAgency from "./operations/Agency/createAgency"
import GetAllAgenciesQuery from "./operations/Agency/getAllAgencies"
import deleteAgency from "./operations/Agency/deleteAgency"
import updateAgency from "./operations/Agency/updateAgency"
import getCustomerContext from "./helpers/Contexts/getCustomerContext"
import { GraphQLError } from "graphql"
import getAgencyById from "./operations/Agency/getAgencyById"
import createAgencies from "./helpers/functions/createAgenciesFunction"

describe("AgencyResolver", () => {
	it("should get all agencies", async () => {
		const numberOfAgencies = 5
		await createAgencies(numberOfAgencies)
		const res = await execute(GetAllAgenciesQuery)
		const agenciesArr: Agency[] = (await res.data?.getAllAgencies) as Agency[]
		expect(agenciesArr.length).toBe(numberOfAgencies)
	})

	it("should get an agency by id", async () => {
		await createAgencies(2)
		const res = await execute(getAgencyById, { agencyId: 1 })
		const agency: Agency = (await res.data?.getAgencyById) as Agency
		expect(agency).toEqual({
			address: "address1",
			city: "city1",
			country: "country1",
			email: "email1",
			id: 1,
			name: "agency1",
			phone: "phone1",
			postcode: "postcode1",
			productCodes: [],
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
				},
			},
			await getCustomerContext()
		)

		const graphQLError = res.errors as GraphQLError[]
		expect(graphQLError[0].message).toBe("Access denied! You don't have permission for this action!")
	})

	it("should delete an agency as an admin", async () => {
		await createAgencies(1)

		const res = await execute(deleteAgency, { agencyId: 1 }, await getAdminContext())
		expect(res.data?.deleteAgency).toBe("Agency deleted")
	})

	it("should not delete an agency if not admin", async () => {
		await createAgencies(1)

		const res = await execute(deleteAgency, { agencyId: 1 }, await getCustomerContext())

		const graphQLError = res.errors as GraphQLError[]
		expect(graphQLError[0].message).toBe("Access denied! You don't have permission for this action!")
	})

	it("should update an agency as an admin", async () => {
		await createAgencies(1)

		let res = await execute(
			updateAgency,
			{
				agencyId: 1,
				data: { name: "new agency name" },
			},
			await getAdminContext()
		)

		let agencyUpdated: Agency = (await res.data?.updateAgency) as Agency
		expect(agencyUpdated.name).toBe("new agency name")
	})

	it("should not update an agency if not admin", async () => {
		await createAgencies(1)
		let res = await execute(
			updateAgency,
			{
				agencyId: 1,
				data: { name: "new agency name" },
			},
			await getCustomerContext()
		)
		const graphQLError = res.errors as GraphQLError[]
		expect(graphQLError[0].message).toBe("Access denied! You don't have permission for this action!")
	})
})
