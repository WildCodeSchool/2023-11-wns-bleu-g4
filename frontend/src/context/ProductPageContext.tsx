import { useGetAllAgenciesQuery } from "@/graphql/Agency/generated/getAllAgency.generated";
import { useGetProductsDetailsQuery } from "@/graphql/Product/generated/getProductsDetails.generated";
import { Agency, Product, ProductCode } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface ProductContextType {
  state: ProductState;
  setState: React.Dispatch<React.SetStateAction<ProductState>>;
  filterAvailableSizes: (agencyId: number | null) => string[];
  setSelectedSize: (size: string | null) => void;
  setSelectedAgency: (agencyId: number | null) => void;
}

interface ProductState {
  selectedProduct: Product | undefined;
  agencies: Agency[];
  selectedAgency: number | null;
  startDate: Date | null;
  endDate: Date | null;
  availableSizes: string[];
  selectedSize: string | null;
  quantity: number;
  totalPrice: number;
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

  const [state, setState] = useState<ProductState>({
    selectedProduct: undefined,
    agencies: [],
    selectedAgency: null,
    startDate: null,
    endDate: null,
    availableSizes: [],
    selectedSize: null,
    quantity: 1,
    totalPrice: 0,
  });

  useEffect(() => {
    if (!productLoading && !productError && productData) {
      const productId = router.query.id as string;
      const selected = productData.getAllProducts.products.find(product => product.id === parseInt(productId));
      setState(prevState => ({ ...prevState, selectedProduct: selected as Product | undefined }));
    }
  }, [productData, productLoading, productError, router.query.id]);

  useEffect(() => {
    if (agencyData) {
      setState(prevState => ({ ...prevState, agencies: agencyData.getAllAgencies as Agency[] }));
    }
  }, [agencyData]);

  const filterAvailableSizes = useCallback((agencyId: number | null): string[] => {
    if (agencyId !== null) {
      const selectedAgencyData = state.agencies.find(agency => agency.id === agencyId);
      const sizes = selectedAgencyData?.productCodes
        ?.map((productCode: ProductCode) => productCode.size)
        .filter((size: null | undefined | string): size is string => typeof size === "string")
        .map((size: string) => size.toUpperCase());
      return sizes || [];
    }
    return [];
  }, [state.agencies]);

  useEffect(() => {
    if (state.selectedAgency !== null) {
      const sizes = filterAvailableSizes(state.selectedAgency);
      setState(prevState => ({ ...prevState, availableSizes: sizes }));
    } else {
      setState(prevState => ({ ...prevState, availableSizes: [] }));
    }
  }, [state.selectedAgency, filterAvailableSizes]);

  return (
    <ProductContext.Provider
      value={{
        state,
        setState,
        filterAvailableSizes,
        setSelectedSize: (size: string | null) => setState(prevState => ({ ...prevState, selectedSize: size })),
        setSelectedAgency:
          (agencyId: number | null) => setState(prevState => ({ ...prevState, selectedAgency: agencyId })),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
