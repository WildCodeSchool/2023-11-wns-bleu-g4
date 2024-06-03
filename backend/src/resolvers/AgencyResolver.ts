import {
    Resolver,
    Query,
    Arg,
    Mutation,
    Int,
    Ctx,
    Authorized,
} from "type-graphql"
import { GraphQLError } from "graphql"
import { ILike } from "typeorm"
import { Context } from "../utils"
import Agency, {
    NewAgencyInput,
    UpdateAgencyInput,
} from "../entities/Agency"
import { UserRole } from "../entities/User";

@Resolver()
class AgencyResolver {
    @Query(() => [Agency])
    async getAllAgencies() {
        return Agency.find()
    }

    @Query(() => Agency)
    async getAgencyById(@Arg("agencyId", () => Int) id: number) {
        const agency = await Agency.findOne({
            where: { id },
        })
        if (!agency) throw new GraphQLError("Agency Not found")
        return agency
    }

    @Authorized([UserRole.ADMIN])
    @Mutation(() => Agency)
    async createAgency(
        @Arg("data",
            { validate: true }
        )
        data: NewAgencyInput,
        @Ctx() ctx: Context
    ) {
        if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
        const newAgency = new Agency()

        if (ctx.currentUser.role !== UserRole.ADMIN)
        	throw new GraphQLError("Not authorized")
        Object.assign(newAgency, data)

        const { id } = await newAgency.save()
        return Agency.findOne({
            where: { id },
        })
    }


    // @Authorized([UserRole.ADMIN])
    @Mutation(() => Agency)
    async updateAgency(
        @Arg("agencyId") id: number,
        @Arg("data", { validate: true }) data: UpdateAgencyInput,
        // @Ctx() ctx: Context
    ) {
        // if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
        const agencyToUpdate = await Agency.findOne({ where: { id } })
        if (!agencyToUpdate) throw new GraphQLError("Agency not found")

        // if (ctx.currentUser.role !== UserRole.ADMIN)
        // throw new GraphQLError("Not authorized")
        await Object.assign(agencyToUpdate, data)

        await agencyToUpdate.save()
        return Agency.findOne({
            where: { id },
        })
    }

    // @Authorized([UserRole.ADMIN])
    @Mutation(() => String)
    async deleteAgency(
        @Arg("agencyId") id: number,
        // @Ctx() ctx: Context
    ) {
        // if (!ctx.currentUser) throw new GraphQLError("Not authenticated")
        const agencyToDelete = await Agency.findOne({ where: { id } })
        if (!agencyToDelete) throw new GraphQLError("Agency not found")

        // if (ctx.currentUser.role !== UserRole.ADMIN)
        // throw new GraphQLError("Not authorized")

        await agencyToDelete.remove()
        return "Agency deleted"
    }

}

export default AgencyResolver
