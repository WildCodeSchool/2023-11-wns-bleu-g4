import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { BookingModalProps } from "../../types";
import { toast } from "react-toastify";
import { ToastConfigWarning } from "@/config/ToastConfig";
import { useCancelBookingMutation } from "@/graphql/Booking/generated/CancelBooking.generated";
import { useCancelBookingItemsMutation } from "@/graphql/BookingItem/generated/CancelBookingItem.generated";
import { useRouter } from "next/router";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GetBookingsByUserIdDocument } from "@/graphql/Booking/generated/GetBookingByUserId.generated";

export default function CancelBookingModal({ isOpen, onClose, bookingId, bookingItemIds }: BookingModalProps) {
  const [cancelBooking] = useCancelBookingMutation();
  const [cancelBookingItems] = useCancelBookingItemsMutation();

  const router = useRouter();
  const { query } = router;
  const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;

  const client = useApolloClient();

  const handleCancelBooking = async () => {
    try {
      client.writeQuery({
        query: GetBookingsByUserIdDocument,
        data: { userId: 2, limit: 10, offset: offset },
      });
      await cancelBooking({ variables: { bookingId } });
      await cancelBookingItems({ variables: { bookingItemIds } });
      history.back();
      toast.success("BOOKING CANCELED SUCCESSFULLY", ToastConfigWarning);
    } catch (error: any) {
      const errArr = error.message.replace("_", " ");
      toast.error(errArr, ToastConfigWarning);
      return;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure you want to cancel this booking ?</ModalHeader>
        <ModalCloseButton />
        <ModalFooter justifyContent={"space-between"} padding={5}>
          <Button onClick={onClose}>Back</Button>
          <Button onClick={handleCancelBooking} variant={"warningButton"}>
            Cancel Booking
          </Button>
          {/* </Flex> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
