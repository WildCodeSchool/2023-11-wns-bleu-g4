import { useGetAllAgenciesQuery } from "@/graphql/Agency/generated/getAllAgency.generated";
import { useGetProductsDetailsQuery } from "@/graphql/Product/generated/getProductsDetails.generated";
import { Agency, Product, ProductCode } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ProductContextType {
  selectedProduct: Product | undefined;
  agencies: Agency[];
  selectedAgency: number | null;
  setSelectedAgency: (id: number | null) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  availableSizes: string[];
  filterAvailableSizes: (agencyId: number | null) => string[];
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { data: agencyData } = useGetAllAgenciesQuery();
  const { data: productData, loading: productLoading, error: productError } = useGetProductsDetailsQuery();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [selectedAgency, setSelectedAgency] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (!productLoading && !productError && productData) {
      const productId = router.query.id as string;
      const selected = productData.getAllProducts.products.find(product => product.id === parseInt(productId));
      setSelectedProduct(selected as Product | undefined);
    }
  }, [productData, productLoading, productError, router.query.id]);

  const agencies = (agencyData?.getAllAgencies as Agency[]) || [];

  const filterAvailableSizes = (agencyId: number | null): string[] => {
    if (agencyId !== null && agencies) {
      const selectedAgencyData = agencies.find(agency => agency.id === agencyId);
      const sizes = selectedAgencyData?.productCodes
        ?.map((productCode: ProductCode) => productCode.size)
        .filter((size: null | undefined | string): size is string => typeof size === "string")
        .map((size: string) => size.toUpperCase());
      return sizes || [];
    }
    return [];
  };

  useEffect(() => {
    if (selectedAgency !== null) {
      const sizes = filterAvailableSizes(selectedAgency);
      setAvailableSizes(sizes);
    } else {
      setAvailableSizes([]);
    }
  }, [selectedAgency, agencies]);

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        agencies,
        selectedAgency,
        setSelectedAgency,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        availableSizes,
        filterAvailableSizes,
        selectedSize,
        setSelectedSize,
        quantity,
        setQuantity,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
