import { useGetAllAgenciesQuery } from "@/graphql/Agency/generated/getAllAgency.generated";
import { useGetAllProductsQuery } from "@/graphql/Product/generated/getProductsDetails.generated";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DetailsComponent from "./detailsComponent/DetailsComponent";
import GaleryComponent from "./galeryComponent/GaleryComponent";

export default function ProductPage({ productId }: { productId: string }) {
  const { data: agencyData, loading: agencyLoading, error: agencyError } = useGetAllAgenciesQuery();
  const { data: productData, loading: productLoading, error: productError } = useGetAllProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (!productLoading && !productError && productData) {
      const selected = productData.getAllProducts.find(product => product.id === parseInt(productId));
      setSelectedProduct(selected || undefined);
    }
  }, [productData, productLoading, productError, productId]);

  if (agencyLoading || productLoading) return <p>Loading...</p>;
  if (agencyError) return <p>Error: {agencyError.message}</p>;
  if (productError) return <p>Error: {productError.message}</p>;

  const agencies = agencyData?.getAllAgencies;

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      px={{ base: "1.25rem", lg: "6.25rem" }}>
      <GaleryComponent />
      <DetailsComponent agencies={agencies} product={selectedProduct} productId={parseInt(productId)} />
    </Box>
  );
}

export interface Agency {
  postcode: string;
  phone: string;
  name: string;
  id: number;
  email: string;
  country: string;
  city: string;
  address: string;
  productCodes: ProductCode[];
}

export interface ProductCode {
  size?: string | number | null;
  isSizeable: boolean;
  status: string;
  id: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  brand: {
    id: number;
    name: string;
    logo: string;
  };
  thumbnail: string;
}
