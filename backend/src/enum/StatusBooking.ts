import { registerEnumType } from "type-graphql"

export enum StatusBooking {
	BOOKED = "booked",
	RETRIEVED = "retrieved",
	LATE = "late",
	CANCELED = "canceled",
}

registerEnumType(StatusBooking, {
	name: "StatusBooking",
	description: "Check booking's state.",
})
