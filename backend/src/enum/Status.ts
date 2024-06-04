import { registerEnumType } from "type-graphql"

export enum Status {
	BOOKED = "booked",
	AVAILABLE = "available",
}

registerEnumType(Status, {
	name: "Status",
	description: "Check if the product is available or booked.",
})
