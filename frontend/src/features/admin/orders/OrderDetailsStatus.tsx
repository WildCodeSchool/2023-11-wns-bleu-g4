import { Button, Flex, FormControl, Select } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { Order } from "./types";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useUpdateBookingMutation } from "@/graphql/Booking/generated/UpdateBooking.generated";
import { GetBookingByIdDocument } from "@/graphql/Booking/generated/GetBookingById.generated";
import { StatusBooking } from "@/graphql/generated/schema";

const statusOptions = [
    { id: 1, value: StatusBooking.Booked, name: "Booked" },
    { id: 2, value: StatusBooking.Retrieved, name: "Retrieved" },
    { id: 3, value: StatusBooking.Late, name: "Late" },
];

export default function OrderDetailsStatus({ order }: { order: Order }) {
    const [updateOrderStatus] = useUpdateBookingMutation();
    const [formData, setFormData] = useState<{ status: StatusBooking }>({ status: order.status });

    const bookingId = order?.id!;

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        updateOrderStatus({
            variables: { data: formData, bookingId },
            refetchQueries: [{ query: GetBookingByIdDocument, variables: { bookingId } }],
        })
            .catch(console.error);
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl isRequired mt={2} maxW={300}>
                <label className="font-bold mb-1" htmlFor="status">Update order status:</label>
                <Flex mt={2}>
                    <Select
                        placeholder="Select a status"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleSelectChange}
                    >
                        {statusOptions.map((status) => (
                            <option key={status.id} value={status.value}>
                                {status.name}
                            </option>
                        ))}
                    </Select>
                    <Button colorScheme="blue" ml={3} type="submit">
                        <CheckIcon className="h-6 w-6" />
                    </Button>
                </Flex>
            </FormControl>
        </form>
    );
};
