import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllBookingQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllBookingQuery = { __typename?: 'Query', getAllBooking: Array<{ __typename?: 'Booking', id: number, status: Types.StatusBooking, invoice: string, bookingDate: any, startDate: any, endDate: any }> };


export const GetAllBookingDocument = gql`
    query GetAllBooking {
  getAllBooking {
    id
    status
    invoice
    bookingDate
    startDate
    endDate
  }
}
    `;

/**
 * __useGetAllBookingQuery__
 *
 * To run a query within a React component, call `useGetAllBookingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBookingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBookingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBookingQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBookingQuery, GetAllBookingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBookingQuery, GetAllBookingQueryVariables>(GetAllBookingDocument, options);
      }
export function useGetAllBookingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBookingQuery, GetAllBookingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBookingQuery, GetAllBookingQueryVariables>(GetAllBookingDocument, options);
        }
export type GetAllBookingQueryHookResult = ReturnType<typeof useGetAllBookingQuery>;
export type GetAllBookingLazyQueryHookResult = ReturnType<typeof useGetAllBookingLazyQuery>;
export type GetAllBookingQueryResult = Apollo.QueryResult<GetAllBookingQuery, GetAllBookingQueryVariables>;