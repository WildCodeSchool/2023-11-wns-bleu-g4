import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import { User, NewUserInput, LoginInput, UpdateUserInput, UserRole } from "../entities/User"
import { GraphQLError } from "graphql"
import { verify } from "argon2"
import jwt from "jsonwebtoken"
import env from "../env"
import { Context } from "../utils"
import crypto from "crypto"
import { UserList } from "../types"

@Resolver(User)
class UserResolver {
	@Mutation(() => User)
	async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
		const existingUser = await User.findOneBy({ email: data.email })
		if (existingUser !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN")

		const newUser = new User()
		Object.assign(newUser, data)

		const token = crypto.randomBytes(32).toString("hex")

		newUser.emailConfirmationToken = token

		const newUserWithId = await newUser.save()
		return newUserWithId
	}

	@Mutation(() => String)
	async login(@Arg("data") data: LoginInput, @Ctx() ctx: Context) {
		const existingUser = await User.findOneBy({ email: data.email })
		if (existingUser === null) throw new GraphQLError("INVALID_CREDENTIALS")
		const passwordValid = await verify(existingUser.hashedPassword, data.password)
		if (!passwordValid) throw new GraphQLError("INVALID_CREDENTIALS")
		if (!existingUser.emailVerified) throw new GraphQLError("EMAIL_NOT_VERIFIED")

		const token = jwt.sign({ userId: existingUser.id, role: existingUser.role }, env.JWT_PRIVATE_KEY)

		ctx.res.cookie("token", token, { httpOnly: true })
		return token
	}

	@Mutation(() => String)
	async logout(@Ctx() ctx: Context) {
		ctx.res.clearCookie("token")
		return "LOGGED_OUT"
	}

	@Authorized()
	@Mutation(() => User)
	async updateProfile(@Ctx() ctx: Context, @Arg("data", { validate: true }) data: UpdateUserInput) {
		if (!ctx.currentUser) throw new GraphQLError("NOT_AUTHENTICATED")

		if (data.name) ctx.currentUser.name = data.name
		if (data.firstname) ctx.currentUser.firstname = data.firstname
		if (data.address) ctx.currentUser.address = data.address
		if (data.postcode) ctx.currentUser.postcode = data.postcode
		if (data.city) ctx.currentUser.city = data.city
		if (data.country) ctx.currentUser.country = data.country
		if (data.phone) ctx.currentUser.phone = data.phone
		if (data.avatar) ctx.currentUser.avatar = data.avatar

		return ctx.currentUser.save()
	}

	@Mutation(() => String)
	async confirmEmail(@Arg("token") token: string) {
		const user = await User.findOneBy({ emailConfirmationToken: token })
		if (user === null) throw new GraphQLError("INVALID_TOKEN")
		user.emailVerified = true
		user.emailConfirmationToken = null

		user.save()
		return "EMAIL_CONFIRMED"
	}

	@Authorized()
	@Query(() => User)
	async profile(@Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("NOT_AUTHENTICATED")
		return User.findOneOrFail({
			where: { id: ctx.currentUser?.id },
		})
	}

	@Authorized([UserRole.ADMIN])
	@Query(() => UserList)
	async getAllUsers(
		@Arg("limit", () => Int, { nullable: true }) limit?: number,
		@Arg("offset", () => Int, { nullable: true }) offset?: number
	) {
		const [users, total] = await User.findAndCount({
			where: { role: UserRole.CUSTOMER },
			take: limit,
			skip: offset,
		})
		return { users, total }
	}
}

export default UserResolver
