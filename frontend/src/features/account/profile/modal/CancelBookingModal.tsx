import { Box, Button, Flex, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { BookingModalProps } from "../../types";
import { toast } from "react-toastify";
import { ToastConfigWarning } from "@/config/ToastConfig";
import { useCancelBookingMutation } from "@/graphql/Booking/generated/CancelBooking.generated";
import { useCancelBookingItemsMutation } from "@/graphql/BookingItem/generated/CancelBookingItem.generated";

export default function CancelBookingModal({ isOpen, onClose, bookingId, bookingItemsId }: BookingModalProps) {

    const [cancelBooking] = useCancelBookingMutation()
    const [cancelBookingItems] = useCancelBookingItemsMutation()

    const data = {
        id: bookingId,
        startDate: new Date(),
        endDate: new Date()
    }

    const handleCancelBooking = async () => {
        try {
            await cancelBooking({ variables: { data }})
            bookingItemsId.forEach(id => {
                data.id = id
                cancelBookingItems({ variables: { data } })
            });

            toast.success("BOOKING CANCELED SUCCESSFULLY", ToastConfigWarning);
            setTimeout(() => {history.back()}, 2000);
        } catch (error: any) {
            const errArr = error.message.replace("_", " ");
            toast.error(errArr, ToastConfigWarning);
            return
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cancel Booking</ModalHeader>
                <ModalCloseButton />
                <hr />
                <Box padding={5}>
                    <Text>Are you sure you want to cancel this booking ?</Text>
                </Box>
                <Flex justifyContent={"space-between"} padding={5}>
                    <Button onClick={onClose}>Back</Button>
                    <Button onClick={handleCancelBooking} variant={"warningButton"}>Cancel Booking</Button>
                </Flex>
            </ModalContent>
        </Modal>
    )
}