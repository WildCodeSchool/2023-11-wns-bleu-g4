import * as Types from "../../generated/schema";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetAllAgenciesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAllAgenciesQuery = {
  __typename?: "Query";
  getAllAgencies: Array<{
    __typename?: "Agency";
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    postcode: string;
    productCodes: Array<{
      __typename?: "ProductCode";
      id: number;
      isSizeable: boolean;
      size?: string | null;
      status: Types.Status;
    }>;
    bookings: Array<{ __typename?: "Booking"; id: number; status: Types.StatusBooking; startDate: any; endDate: any }>;
  }>;
};

export const GetAllAgenciesDocument = gql`
  query GetAllAgencies {
    getAllAgencies {
      id
      name
      address
      city
      country
      email
      phone
      postcode
      productCodes {
        id
        isSizeable
        size
        status
      }
      bookings {
        id
        status
        startDate
        endDate
      }
    }
  }
`;

/**
 * __useGetAllAgenciesQuery__
 *
 * To run a query within a React component, call `useGetAllAgenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAgenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
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
export function useGetAllAgenciesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllAgenciesQuery, GetAllAgenciesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllAgenciesQuery, GetAllAgenciesQueryVariables>(GetAllAgenciesDocument, options);
}
export type GetAllAgenciesQueryHookResult = ReturnType<typeof useGetAllAgenciesQuery>;
export type GetAllAgenciesLazyQueryHookResult = ReturnType<typeof useGetAllAgenciesLazyQuery>;
export type GetAllAgenciesSuspenseQueryHookResult = ReturnType<typeof useGetAllAgenciesSuspenseQuery>;
export type GetAllAgenciesQueryResult = Apollo.QueryResult<GetAllAgenciesQuery, GetAllAgenciesQueryVariables>;
