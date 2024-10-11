import Product from "../../src/entities/Product"
import Booking from "../../src/entities/Booking"
import { StatusBooking } from "../../src/enum/StatusBooking"
import Agency from "../../src/entities/Agency"
import { BookingItemStatus } from "../../src/enum/BookingItemStatus"
import BookingItem from "../../src/entities/BookingItem"
import ProductCode from "../../src/entities/ProductCode"

const CreateAgency = async () => {
	let agency = await Agency.findOne({ where: { email: "agency@example.com" } })

	if (!agency) {
		agency = await Agency.create({
			name: "My First Agency",
			address: "123 Main St",
			postcode: "12345",
			city: "Paris",
			country: "France",
			phone: "+33 1 23 45 67 89",
			email: "agency@example.com",
		}).save()
	}

	return agency
}
const CreateProductCode = async () => {
	const productCode = await ProductCode.create({}).save()

	return productCode
}

const CreateProduct = async () => {
	let product = await Product.findOne({ where: { ref: "ref 1" } })

	if (!product) {
		product = await Product.create({
			name: "Product 1",
			description: "Description 1",
			price: 100,
			thumbnail: "thumbnail 1",
			ref: "ref 1",
		}).save()
	}

	return product
}

export const CreateBookings = async (userId: number) => {
	const agency = await CreateAgency()
	const product = await CreateProduct()

	const booking = await Booking.create({
		status: StatusBooking.BOOKED,
		invoice: "inv-152346",
		bookingDate: new Date("2024-11-06T15:05:08.339Z"),
		startDate: new Date("2024-06-15T15:05:08.339Z"),
		endDate: new Date("2024-06-16T15:05:08.339Z"),
		user: { id: userId },
		agency,
	}).save()

	const bookingItem = await BookingItem.create({
		status: BookingItemStatus.RENTED,
		startDate: new Date("2024-06-15T15:05:08.339Z"),
		endDate: new Date("2024-06-16T15:05:08.339Z"),
		product,
		productCode: { id: 1 },
		booking,
	}).save()
}
