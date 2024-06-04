import { registerEnumType } from "type-graphql"

export enum StatusBooking {
	BOOKED = "booked",
	CURRENT = "current",
	LATE = "late",
	CANCEL = "cancel",
}

registerEnumType(StatusBooking, {
	name: "StatusBooking",
	description: "Check booking's state.",
})
