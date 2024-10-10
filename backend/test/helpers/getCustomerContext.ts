import getCustomerJWT from "./getCustomerJWT"

export default async function () {
	const { JWT } = await getCustomerJWT()
	return { req: { headers: { authorization: `Bearer ${JWT}` } } }
}
