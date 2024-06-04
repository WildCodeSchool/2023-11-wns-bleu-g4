import { registerEnumType } from "type-graphql"

export enum BookingItemStatus {
	LOST = "lost",
	BROKEN = "broken",
	RENT = "rent",
	BACK = "back"
}

registerEnumType(BookingItemStatus, {
	name: "BookingItemStatus",
	description: "Check bookingItem's status.",
})
