import { GraphQLError } from "graphql"
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import Agency, { NewAgencyInput, UpdateAgencyInput } from "../entities/Agency"
import { UserRole } from "../entities/User"
import { Context } from "../utils"

@Resolver()
class AgencyResolver {
	@Query(() => [Agency])
	async getAllAgencies() {
		const agencies = await Agency.find({ relations: ["productCodes", "bookings"] })
		return agencies.map((agency) => ({
			...agency,
			bookings: agency.bookings || [],
		}))
	}

	@Query(() => Agency)
	async getAgencyById(@Arg("agencyId", () => Int) id: number) {
		const agency = await Agency.findOne({
			where: { id },
			relations: ["productCodes", "bookings"],
		})
		if (!agency) throw new GraphQLError("Agency Not found")

		return {
			...agency,
			bookings: agency.bookings || [],
		}
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Agency)
	async createAgency(@Arg("data", { validate: true }) data: NewAgencyInput, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const newAgency = new Agency()

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		Object.assign(newAgency, data)

		const { id } = await newAgency.save()
		return Agency.findOne({
			where: { id },
			relations: ["productCodes", "bookings"],
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Agency)
	async updateAgency(
		@Arg("agencyId", () => Int) id: number,
		@Arg("data", { validate: true }) data: UpdateAgencyInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const agencyToUpdate = await Agency.findOne({ where: { id } })
		if (!agencyToUpdate) throw new GraphQLError("Agency not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		await Object.assign(agencyToUpdate, data)

		await agencyToUpdate.save()
		return Agency.findOne({
			where: { id },
			relations: ["productCodes", "bookings"],
		})
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => String)
	async deleteAgency(@Arg("agencyId", () => Int) id: number, @Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
		const agencyToDelete = await Agency.findOne({ where: { id } })
		if (!agencyToDelete) throw new GraphQLError("Agency not found")

		if (ctx.currentUser.role !== UserRole.ADMIN) throw new GraphQLError("Not authorized")

		await agencyToDelete.remove()
		return "Agency deleted"
	}
}

export default AgencyResolver
