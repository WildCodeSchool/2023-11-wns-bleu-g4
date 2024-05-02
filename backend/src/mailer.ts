import nodemailer from "nodemailer"
import env from "./env"

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = env

export default nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	secure: true,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS,
	},
})
