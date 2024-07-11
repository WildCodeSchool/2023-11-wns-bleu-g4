import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBookingsByUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetBookingsByUserIdQuery = { __typename?: 'Query', getBookingsByUserId: { __typename?: 'BookingList', total: number, bookings: Array<{ __typename?: 'Booking', bookingDate: any, endDate: any, id: number, invoice: string, startDate: any, status: Types.StatusBooking, agency: { __typename?: 'Agency', id: number, name: string, email: string, phone: string, city: string } }> } };


export const GetBookingsByUserIdDocument = gql`
    query GetBookingsByUserId($userId: Int!, $offset: Int, $limit: Int) {
  getBookingsByUserId(userId: $userId, offset: $offset, limit: $limit) {
    bookings {
      agency {
        id
        name
        email
        phone
        city
      }
      bookingDate
      endDate
      id
      invoice
      startDate
      status
    }
    total
  }
}
    `;

/**
 * __useGetBookingsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetBookingsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetBookingsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookingsByUserIdQuery, GetBookingsByUserIdQueryVariables> & ({ variables: GetBookingsByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingsByUserIdQuery, GetBookingsByUserIdQueryVariables>(GetBookingsByUserIdDocument, options);
      }
export function useGetBookingsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingsByUserIdQuery, GetBookingsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingsByUserIdQuery, GetBookingsByUserIdQueryVariables>(GetBookingsByUserIdDocument, options);
        }
export function useGetBookingsByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookingsByUserIdQuery, GetBookingsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookingsByUserIdQuery, GetBookingsByUserIdQueryVariables>(GetBookingsByUserIdDocument, options);
        }
export type GetBookingsByUserIdQueryHookResult = ReturnType<typeof useGetBookingsByUserIdQuery>;
export type GetBookingsByUserIdLazyQueryHookResult = ReturnType<typeof useGetBookingsByUserIdLazyQuery>;
export type GetBookingsByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetBookingsByUserIdSuspenseQuery>;
export type GetBookingsByUserIdQueryResult = Apollo.QueryResult<GetBookingsByUserIdQuery, GetBookingsByUserIdQueryVariables>;