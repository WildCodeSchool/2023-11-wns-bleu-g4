import { execute } from "../jest.setup"
import Agency from "../src/entities/Agency"
import getAdminContext from "./helpers/getAdminContext"
import createAgency from "./operations/createAgency"
import getAllAgencies from "./operations/getAllAgencies"

describe("AgencyResolver", () => {
	it("should get all agencies", async () => {
		await Agency.create({
			name: "agency1",
			address: "address1",
			postcode: "postcode1",
			city: "city1",
			country: "country1",
			phone: "phone1",
			email: "email1",
		}).save()
		await Agency.create({
			name: "agency2",
			address: "address2",
			postcode: "postcode2",
			city: "city2",
			country: "country2",
			phone: "phone2",
			email: "email2",
		}).save()
		const res = await execute(getAllAgencies)
		expect(res).toMatchInlineSnapshot(`
		{
		  "data": {
		    "getAllAgencies": [
		      {
		        "address": "address2",
		        "city": "city2",
		        "country": "country2",
		        "email": "email2",
		        "id": 2,
		        "name": "agency2",
		        "phone": "phone2",
		        "postcode": "postcode2",
		      },
		      {
		        "address": "address1",
		        "city": "city1",
		        "country": "country1",
		        "email": "email1",
		        "id": 1,
		        "name": "agency1",
		        "phone": "phone1",
		        "postcode": "postcode1",
		      },
		    ],
		  },
		}
	`)
	})

	it("should create an agency with JWT", async () => {
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
			await getAdminContext()
		)
		expect(res).toMatchInlineSnapshot(`
		{
		  "data": {
		    "createAgency": {
		      "address": "address1",
		      "city": "city1",
		      "country": "country1",
		      "email": "email1",
		      "id": 1,
		      "name": "agency1",
		      "phone": "phone1",
		      "postcode": "postcode1",
		    },
		  },
		}
	`)

		const agencyInDB = await Agency.findOneBy({ id: 1 })
		expect(agencyInDB).toMatchInlineSnapshot(`
		Agency {
		  "address": "address1",
		  "bookings": undefined,
		  "city": "city1",
		  "country": "country1",
		  "email": "email1",
		  "id": 1,
		  "name": "agency1",
		  "phone": "phone1",
		  "postcode": "postcode1",
		  "productCodes": undefined,
		}
	`)
	})

	it("should not create an agency without JWT", async () => {
		const res = await execute(createAgency, {
			data: {
				name: "agency1",
				address: "address1",
				postcode: "postcode1",
				city: "city1",
				country: "country1",
				phone: "phone1",
				email: "email1",
			},
		})
		expect(res).toMatchInlineSnapshot(`
		{
		  "data": null,
		  "errors": [
		    [GraphQLError: Access denied! You don't have permission for this action!],
		  ],
		}
	`)
		const agencyInDB = await Agency.findOneBy({ id: 1 })
		expect(agencyInDB).toMatchInlineSnapshot(`null`)
	})
})
