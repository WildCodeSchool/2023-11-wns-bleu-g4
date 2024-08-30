import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import {useGetAllAgenciesQuery} from "@/graphql/Agency/generated/GetAllAgencies.generated";
import {useGetProductsDetailsQuery} from "@/graphql/Product/generated/getProductsDetails.generated";
import {Agency, Product} from "@/graphql/generated/schema";
import {useGetSizeByAgencyIdQuery} from "@/graphql/Agency/generated/getSizeByAgencyId.generated";

interface ProductContextType {
  state: ProductState;
  setState: React.Dispatch<React.SetStateAction<ProductState>>;
  filterAvailableSizes: () => string[];
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
  isSizeable: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const router = useRouter();
  const {data: agencyData} = useGetAllAgenciesQuery();
  const {data: productData, loading: productLoading, error: productError} = useGetProductsDetailsQuery();

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
    isSizeable: false,
  });

  const {data: sizeData, refetch: refetchSizes} = useGetSizeByAgencyIdQuery({
    variables: {agencyId: state.selectedAgency!},
    skip: state.selectedAgency === null,
  });

  const filterAvailableSizes = useCallback((): string[] => {
    if (sizeData && state.selectedProduct) {
      const sizeableProductCodes = sizeData.getAgencyById.productCodes.filter(
        productCode => productCode.product?.id === state.selectedProduct!.id && productCode.isSizeable
      );

      // Update the isSizeable state based on whether there are sizeable product codes
      setState(prevState => ({
        ...prevState,
        isSizeable: sizeableProductCodes.length > 0
      }));

      return sizeableProductCodes
        .map(productCode => productCode.size)
        .filter((size): size is string => typeof size === 'string')
        .map(size => size.toUpperCase());
    }
    return [];
  }, [sizeData, state.selectedProduct]);

  useEffect(() => {
    if (!productLoading && !productError && productData) {
      const productId = router.query.id as string;
      const selected = productData.getAllProducts.products.find(product => product.id === parseInt(productId));
      setState(prevState => ({...prevState, selectedProduct: selected as Product | undefined}));
    }
  }, [productData, productLoading, productError, router.query.id]);

  useEffect(() => {
    if (agencyData) {
      setState(prevState => ({...prevState, agencies: agencyData.getAllAgencies as Agency[]}));
    }
  }, [agencyData]);

  useEffect(() => {
    if (state.selectedAgency !== null) {
      refetchSizes();
      const sizes = filterAvailableSizes();
      setState(prevState => ({...prevState, availableSizes: sizes}));
    } else {
      setState(prevState => ({...prevState, availableSizes: []}));
    }
  }, [state.selectedAgency, filterAvailableSizes, refetchSizes]);

  useEffect(() => {
  }, [state]);

  const contextValue = useMemo(() => ({
    state,
    setState,
    filterAvailableSizes,
    setSelectedSize: (size: string | null) => {
      setState(prevState => ({...prevState, selectedSize: size}));
    },
    setSelectedAgency: (agencyId: number | null) => {
      setState(prevState => ({
        ...prevState,
        selectedAgency: agencyId
      }));
    },
  }), [state, filterAvailableSizes]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
