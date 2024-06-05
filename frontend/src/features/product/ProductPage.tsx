import { useGetAllAgenciesQuery } from "@/graphql/Agency/generated/getAllAgency.generated";
import { Box } from "@chakra-ui/react";
import DetailsComponent from "./detailsComponent/DetailsComponent";
import GaleryComponent from "./galeryComponent/GaleryComponent";

export default function ProductPage() {
  const { data: agencyData, loading: agencyLoading, error: agencyError } = useGetAllAgenciesQuery();

  if (agencyLoading) return <p>Loading...</p>;
  if (agencyError) return <p>Error: {agencyError.message}</p>;

  const agencies = agencyData?.getAllAgencies;

  return (
    <Box width="100%" display="flex" flexDirection="row" border="2px solid yellow">
      <GaleryComponent />
      <DetailsComponent />
    </Box>
  );
}
