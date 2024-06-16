import { registerEnumType } from "type-graphql"

export enum BookingItemStatus {
	LOST = "lost",
	BROKEN = "broken",
	RENTED = "rented",
	RETURNED = "returned",
	CANCELED = "canceled",
}

registerEnumType(BookingItemStatus, {
	name: "BookingItemStatus",
	description: "Check bookingItem's status.",
})