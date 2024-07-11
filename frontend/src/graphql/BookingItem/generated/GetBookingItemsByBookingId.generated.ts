import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBookingItemsByBookingIdQueryVariables = Types.Exact<{
  bookingId: Types.Scalars['Int']['input'];
}>;


export type GetBookingItemsByBookingIdQuery = { __typename?: 'Query', getBookingItemsByBookingId: Array<{ __typename?: 'BookingItem', id: number, status: Types.BookingItemStatus, startDate: any, endDate: any, product: { __typename?: 'Product', name: string, price: number, thumbnail: string } }> };


export const GetBookingItemsByBookingIdDocument = gql`
    query GetBookingItemsByBookingId($bookingId: Int!) {
  getBookingItemsByBookingId(bookingId: $bookingId) {
    id
    status
    startDate
    endDate
    product {
      name
      price
      thumbnail
    }
  }
}
    `;

/**
 * __useGetBookingItemsByBookingIdQuery__
 *
 * To run a query within a React component, call `useGetBookingItemsByBookingIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingItemsByBookingIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingItemsByBookingIdQuery({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useGetBookingItemsByBookingIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookingItemsByBookingIdQuery, GetBookingItemsByBookingIdQueryVariables> & ({ variables: GetBookingItemsByBookingIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingItemsByBookingIdQuery, GetBookingItemsByBookingIdQueryVariables>(GetBookingItemsByBookingIdDocument, options);
      }
export function useGetBookingItemsByBookingIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingItemsByBookingIdQuery, GetBookingItemsByBookingIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingItemsByBookingIdQuery, GetBookingItemsByBookingIdQueryVariables>(GetBookingItemsByBookingIdDocument, options);
        }
export function useGetBookingItemsByBookingIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookingItemsByBookingIdQuery, GetBookingItemsByBookingIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookingItemsByBookingIdQuery, GetBookingItemsByBookingIdQueryVariables>(GetBookingItemsByBookingIdDocument, options);
        }
export type GetBookingItemsByBookingIdQueryHookResult = ReturnType<typeof useGetBookingItemsByBookingIdQuery>;
export type GetBookingItemsByBookingIdLazyQueryHookResult = ReturnType<typeof useGetBookingItemsByBookingIdLazyQuery>;
export type GetBookingItemsByBookingIdSuspenseQueryHookResult = ReturnType<typeof useGetBookingItemsByBookingIdSuspenseQuery>;
export type GetBookingItemsByBookingIdQueryResult = Apollo.QueryResult<GetBookingItemsByBookingIdQuery, GetBookingItemsByBookingIdQueryVariables>;