import { registerEnumType } from "type-graphql"

export enum Status {
	AVAILABLE = "available",
	BROKEN = "broken",
}

registerEnumType(Status, {
	name: "Status",
	description: "Check if the product is available.",
})