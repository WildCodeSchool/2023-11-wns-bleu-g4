import { useCreateBookingMutation } from "@/graphql/Booking/generated/CreateBooking.generated";
import { StatusBooking } from "@/graphql/generated/schema";

export const useBookingMutation = () => {
  const [createBooking] = useCreateBookingMutation();

  const performBookingMutation = async ({
    profileData,
    profileLoading,
    profileError,
    reservations,
  }: UseBookingMutationParams) => {
    if (profileLoading) {
      console.log("Vérification de l'authentification...");
      return;
    }

    if (profileError || !profileData?.profile) {
      console.error("Utilisateur non authentifié");
      return;
    }

    if (!reservations || reservations.length === 0) {
      console.error("Aucune réservation à traiter");
      return;
    }

    try {
      const currentDate = new Date().toISOString();

      // Pour chaque réservation, créer un booking
      const promises = reservations.map(async reservation => {
        const { selectedAgency, startDate, endDate, product, quantity, selectedSize } = reservation;

        if (!startDate || !endDate) {
          console.error("Dates de début et de fin requises");
          return null;
        }

        if (!selectedAgency) {
          console.error("Agence non sélectionnée");
          return null;
        }

        const startDateUtc = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
        const endDateUtc = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

        const response = await createBooking({
          variables: {
            data: {
              agency: {
                id: selectedAgency,
              },
              bookingDate: currentDate,
              startDate: startDateUtc.toISOString(),
              endDate: endDateUtc.toISOString(),
              productCodeId: null,
              productId: product.id,
              status: "BOOKED" as StatusBooking,
              user: {
                id: profileData.profile.id,
              },
              quantity: quantity,
              size: selectedSize,
            },
          },
        });

        console.log("Booking created", response);

        return response;
      });

      const results = await Promise.all(promises);

      console.log("All bookings created", results);
    } catch (error) {
      console.error("Error creating bookings", error);
    }
  };

  return { performBookingMutation };
};
// Mise à jour de l'interface UseBookingMutationParams
interface UseBookingMutationParams {
  profileData: any;
  profileLoading: boolean;
  profileError: any;
  reservations?: {
    selectedAgency: number | null;
    startDate: Date | null;
    endDate: Date | null;
    product: any;
    quantity: number;
    selectedSize: string | null;
  }[];
}
