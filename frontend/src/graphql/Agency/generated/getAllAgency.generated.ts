import * as Types from "../../generated/schema";

import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
const defaultOptions = {} as const;
export type GetAllAgenciesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAllAgenciesQuery = {
  __typename?: "Query";
  getAllAgencies: Array<{
    __typename?: "Agency";
    postcode: string;
    phone: string;
    name: string;
    id: number;
    email: string;
    country: string;
    city: string;
    address: string;
    productCodes: Array<{
      __typename?: "Product_code";
      size?: string | null;
      isSizeable: boolean;
      status: Types.Status;
      id: number;
    }>;
  }>;
};

export const GetAllAgenciesDocument = gql`
  query GetAllAgencies {
    getAllAgencies {
      postcode
      phone
      name
      id
      email
      country
      city
      address
      productCodes {
        size
        isSizeable
        status
        id
      }
    }
  }
`;

/**
 * __useGetAllAgenciesQuery__
 *
 * To run a query within a React component, call `useGetAllAgenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAgenciesQuery` returns an object from Apollo Client that contains loading,
 *  error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on:
 *  https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAgenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAgenciesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllAgenciesQuery, GetAllAgenciesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllAgenciesQuery, GetAllAgenciesQueryVariables>(GetAllAgenciesDocument, options);
}
export function useGetAllAgenciesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllAgenciesQuery, GetAllAgenciesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllAgenciesQuery, GetAllAgenciesQueryVariables>(GetAllAgenciesDocument, options);
}
export type GetAllAgenciesQueryHookResult = ReturnType<typeof useGetAllAgenciesQuery>;
export type GetAllAgenciesLazyQueryHookResult = ReturnType<typeof useGetAllAgenciesLazyQuery>;
export type GetAllAgenciesQueryResult = Apollo.QueryResult<GetAllAgenciesQuery, GetAllAgenciesQueryVariables>;
