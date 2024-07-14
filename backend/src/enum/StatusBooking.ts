import { registerEnumType } from "type-graphql"

export enum StatusBooking {
	BOOKED = "booked",
	RETRIEVED = "retrieved",
	LATE = "late",
	CANCELLED = "cancelled",
}

registerEnumType(StatusBooking, {
	name: "StatusBooking",
	description: "Check booking's state.",
})
