import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllBookingQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllBookingQuery = { __typename?: 'Query', getAllBooking: { __typename?: 'BookingList', total: number, bookings: Array<{ __typename?: 'Booking', id: number, status: Types.StatusBooking, invoice: string, bookingDate: any, startDate: any, endDate: any }> } };


export const GetAllBookingDocument = gql`
    query GetAllBooking($offset: Int, $limit: Int) {
  getAllBooking(offset: $offset, limit: $limit) {
    bookings {
      id
      status
      invoice
      bookingDate
      startDate
      endDate
    }
    total
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
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
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
export function useGetAllBookingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllBookingQuery, GetAllBookingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllBookingQuery, GetAllBookingQueryVariables>(GetAllBookingDocument, options);
        }
export type GetAllBookingQueryHookResult = ReturnType<typeof useGetAllBookingQuery>;
export type GetAllBookingLazyQueryHookResult = ReturnType<typeof useGetAllBookingLazyQuery>;
export type GetAllBookingSuspenseQueryHookResult = ReturnType<typeof useGetAllBookingSuspenseQuery>;
export type GetAllBookingQueryResult = Apollo.QueryResult<GetAllBookingQuery, GetAllBookingQueryVariables>;