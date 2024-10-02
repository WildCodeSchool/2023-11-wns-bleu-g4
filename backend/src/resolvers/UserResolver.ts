import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import { User, NewUserInput, LoginInput, UpdateUserInput, UserRole } from "../entities/User"
import { GraphQLError } from "graphql"
import jwt from "jsonwebtoken"
import env from "../env"
import { Context } from "../utils"
import crypto from "crypto"
import { UserList } from "../types"
import mailer from "../mailer"
import { ILike } from "typeorm"
import { hash, verify } from "argon2"

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

		await mailer.sendMail({
			from: env.EMAIL_FROM,
			to: newUser.email,
			subject: "Welcome to GearGo",
			text: `Welcome aboard ! To verify your email, please click on the link : ${env.FRONTEND_URL}/confirmEmail?token=${token}`,
		})

		const newUserWithId = await newUser.save()
		return newUserWithId
	}

	@Authorized()
	@Mutation(() => User)
	async updatePassword(
		@Arg("currentPassword") currentPassword: string,
		@Arg("newPassword") newPassword: string,
		@Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("NOT_AUTHENTICATED")

		const passwordValid = await verify(ctx.currentUser.hashedPassword, currentPassword)
		if (!passwordValid) throw new GraphQLError("INVALID_CURRENT_PASSWORD")

		if (newPassword) ctx.currentUser.hashedPassword = await hash(newPassword)

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
	async updateProfile(
		@Ctx() ctx: Context,
		@Arg("data", { validate: true }) data: UpdateUserInput) {
		if (!ctx.currentUser) throw new GraphQLError("NOT_AUTHENTICATED")

		if (data.name) ctx.currentUser.name = data.name
		if (data.firstname) ctx.currentUser.firstname = data.firstname
		if (data.address) ctx.currentUser.address = data.address
		if (data.postcode) ctx.currentUser.postcode = data.postcode
		if (data.city) ctx.currentUser.city = data.city
		if (data.country) ctx.currentUser.country = data.country
		if (data.phone) ctx.currentUser.phone = data.phone
		if (data.avatar) ctx.currentUser.avatar = data.avatar
		// if (data.email) ctx.currentUser.email = data.email

		return ctx.currentUser.save()
	}

	@Authorized()
	@Query(() => User)
	async profile(@Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("NOT_AUTHENTICATED")
		return User.findOneOrFail({
			where: { id: ctx.currentUser?.id },
		})
	}

	@Authorized()
	@Mutation(() => String)
	async deleteProfile(@Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("NOT_AUTHENTICATED")

		const user = await User.findOne({
			where: { id: ctx.currentUser?.id },
		})

		if (!user) throw new GraphQLError("USER_NOT_FOUND");

		await user.remove()

		return "ACCOUNT_DELETED"
	}


	@Authorized([UserRole.ADMIN])
	@Query(() => UserList)
	async getAllUsers(
		@Arg("limit", () => Int, { nullable: true }) limit?: number,
		@Arg("offset", () => Int, { nullable: true }) offset?: number,
		@Arg("email", () => String, { nullable: true }) email?: string,
		@Arg("name", () => String, { nullable: true }) name?: string,
		@Arg("firstname", () => String, { nullable: true }) firstname?: string
	) {
		const whereConditions = []
		if (email) whereConditions.push({ email: ILike(`%${email}%`) })
		if (name) whereConditions.push({ name: ILike(`%${name}%`) })
		if (firstname) whereConditions.push({ firstname: ILike(`%${firstname}%`) })

		const whereClause =
			whereConditions.length > 0
				? whereConditions.map((condition) => ({ role: UserRole.CUSTOMER, ...condition }))
				: { role: UserRole.CUSTOMER }

		const [users, total] = await User.findAndCount({
			where: whereClause,
			take: limit,
			skip: offset,
		})

		return { users, total }
	}
}

export default UserResolver
