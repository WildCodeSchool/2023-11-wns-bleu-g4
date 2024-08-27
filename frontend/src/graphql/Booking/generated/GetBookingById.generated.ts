import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBookingByIdQueryVariables = Types.Exact<{
  bookingId: Types.Scalars['Int']['input'];
}>;


export type GetBookingByIdQuery = { __typename?: 'Query', getBookingById: { __typename?: 'Booking', id: number, status: Types.StatusBooking, invoice: string, bookingDate: any, startDate: any, endDate: any, user: { __typename?: 'User', address: string, city: string, country: string, email: string, firstname: string, name: string, phone: string, postcode: string }, agency: { __typename?: 'Agency', address: string, city: string, country: string, email: string, name: string, phone: string, postcode: string } } };


export const GetBookingByIdDocument = gql`
    query GetBookingById($bookingId: Int!) {
  getBookingById(bookingId: $bookingId) {
    id
    status
    invoice
    bookingDate
    startDate
    endDate
    user {
      address
      city
      country
      email
      firstname
      name
      phone
      postcode
    }
    agency {
      address
      city
      country
      email
      name
      phone
      postcode
    }
  }
}
    `;

/**
 * __useGetBookingByIdQuery__
 *
 * To run a query within a React component, call `useGetBookingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingByIdQuery({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useGetBookingByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookingByIdQuery, GetBookingByIdQueryVariables> & ({ variables: GetBookingByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingByIdQuery, GetBookingByIdQueryVariables>(GetBookingByIdDocument, options);
      }
export function useGetBookingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingByIdQuery, GetBookingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingByIdQuery, GetBookingByIdQueryVariables>(GetBookingByIdDocument, options);
        }
export function useGetBookingByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookingByIdQuery, GetBookingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookingByIdQuery, GetBookingByIdQueryVariables>(GetBookingByIdDocument, options);
        }
export type GetBookingByIdQueryHookResult = ReturnType<typeof useGetBookingByIdQuery>;
export type GetBookingByIdLazyQueryHookResult = ReturnType<typeof useGetBookingByIdLazyQuery>;
export type GetBookingByIdSuspenseQueryHookResult = ReturnType<typeof useGetBookingByIdSuspenseQuery>;
export type GetBookingByIdQueryResult = Apollo.QueryResult<GetBookingByIdQuery, GetBookingByIdQueryVariables>;