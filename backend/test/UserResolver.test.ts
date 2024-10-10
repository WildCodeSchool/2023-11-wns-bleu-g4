import { GraphQLError } from "graphql"
import { execute } from "../jest.setup"
import { UserList } from "../src/types"
import getAdminContext from "./helpers/Contexts/getAdminContext"
import getCustomerContext from "./helpers/Contexts/getCustomerContext"
import createUsers from "./helpers/functions/createUsersFunction"
import GetAllUsers from "./operations/User/GetAllUsers"
import CreateUser from "./operations/User/CreateUser"

describe("UserResolver", () => {
	describe("Create", () => {
		it("should create a user with secure password", async () => {
			const res = await execute(CreateUser, {
				data: {
					email: "my_email@gmail.com",
					password: "Secur3P@ssw0rd",
					acceptConditions: true,
				},
			})
			expect(res.data?.createUser).toEqual({
				id: 1,
				email: "my_email@gmail.com",
			})
		})

		it("should not create a user with unsecure password", async () => {
			const res = await execute(CreateUser, {
				data: {
					email: "my_email@gmail.com",
					password: "password",
					acceptConditions: true,
				},
			})
			const graphQLError = res.errors as GraphQLError[]
			expect(graphQLError[0].message).toBe("Argument Validation Error")
		})

		it("should not create a user if email already exists", async () => {
			await createUsers(1)
			const res = await execute(CreateUser, {
				data: {
					email: "customer1@gmail.com",
					password: "Secur3P@ssw0rd",
					acceptConditions: true,
				},
			})
			const graphQLError = res.errors as GraphQLError[]
			expect(graphQLError[0].message).toBe("EMAIL_ALREADY_TAKEN")
		})

		it("should not create a user without accepting conditions", async () => {
			const res = await execute(CreateUser, {
				data: {
					email: "customer1@gmail.com",
					password: "Secur3P@ssw0rd",
					acceptConditions: false,
				},
			})
			const graphQLError = res.errors as GraphQLError[]
			expect(graphQLError[0].message).toBe("You have to accept terms and conditions")
		})

		it("should not create a user with bad email address", async () => {
			const res = await execute(CreateUser, {
				data: {
					email: "customer1@gmail",
					password: "Secur3P@ssw0rd",
					acceptConditions: true,
				},
			})
			const graphQLError = res.errors as GraphQLError[]
			expect(graphQLError[0].message).toBe("Argument Validation Error")
		})
	})

	describe("Read", () => {
		it("should get all users as an Admin", async () => {
			const numberOfUsers = 3
			await createUsers(numberOfUsers)
			const res = await execute(GetAllUsers, { limit: 10, offset: 0 }, await getAdminContext())
			const totalOfUsers = res.data?.getAllUsers as UserList
			expect(totalOfUsers.total).toBe(numberOfUsers)
		})

		it("should get a limit of 5 users instead of 8", async () => {
			const numberOfUsers = 8
			await createUsers(numberOfUsers)
			const res = await execute(GetAllUsers, { limit: 5, offset: 0 }, await getAdminContext())
			const totalOfUsers = res.data?.getAllUsers as UserList
			expect(totalOfUsers.users.length).toBe(5)
		})

		it("should not get any user if not Admin", async () => {
			const numberOfUsers = 3
			await createUsers(numberOfUsers)
			const res = await execute(GetAllUsers, { limit: 10, offset: 0 }, await getCustomerContext())
			const graphQLError = res.errors as GraphQLError[]
			expect(graphQLError[0].message).toBe("Access denied! You don't have permission for this action!")
		})
	})
})
