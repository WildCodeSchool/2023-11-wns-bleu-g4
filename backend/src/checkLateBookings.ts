import { Booking } from "./entities/Booking"
import { StatusBooking } from "./enum/StatusBooking"
import dayjs from "dayjs"

async function checkLateBookings() {
	const now = dayjs()

	const bookingsToUpdate = await Booking.find({
		where: {
			endDate: dayjs(now).subtract(1, "day").toDate(),
			status: StatusBooking.RETRIEVED,
		},
	})

	for (const booking of bookingsToUpdate) {
		booking.status = StatusBooking.LATE
		await booking.save()
	}
}

function scheduleMidnightCheck() {
	const now = dayjs()
	const nextMidnight = now.add(1, "day").startOf("day")
	const timeUntilMidnight = nextMidnight.diff(now)

	setTimeout(() => {
		checkLateBookings()
		setInterval(checkLateBookings, 24 * 60 * 60 * 1000)
	}, timeUntilMidnight)

	console.log(`Scheduled first check at: ${nextMidnight.format()}`)
}

scheduleMidnightCheck()
