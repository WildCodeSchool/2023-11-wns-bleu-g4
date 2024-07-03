import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBookingsByUserQueryVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['Float']['input']>;
}>;


export type GetBookingsByUserQuery = { __typename?: 'Query', getAllBooking: Array<{ __typename?: 'Booking', id: number, status: Types.StatusBooking, invoice: string, bookingDate: any, startDate: any, endDate: any, agency: { __typename?: 'Agency', name: string, id: number } }> };


export const GetBookingsByUserDocument = gql`
    query GetBookingsByUser($userId: Float) {
  getAllBooking(userId: $userId) {
    id
    status
    invoice
    bookingDate
    startDate
    endDate
    agency {
      name
      id
    }
  }
}
    `;

/**
 * __useGetBookingsByUserQuery__
 *
 * To run a query within a React component, call `useGetBookingsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetBookingsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetBookingsByUserQuery, GetBookingsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingsByUserQuery, GetBookingsByUserQueryVariables>(GetBookingsByUserDocument, options);
      }
export function useGetBookingsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingsByUserQuery, GetBookingsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingsByUserQuery, GetBookingsByUserQueryVariables>(GetBookingsByUserDocument, options);
        }
export function useGetBookingsByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookingsByUserQuery, GetBookingsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookingsByUserQuery, GetBookingsByUserQueryVariables>(GetBookingsByUserDocument, options);
        }
export type GetBookingsByUserQueryHookResult = ReturnType<typeof useGetBookingsByUserQuery>;
export type GetBookingsByUserLazyQueryHookResult = ReturnType<typeof useGetBookingsByUserLazyQuery>;
export type GetBookingsByUserSuspenseQueryHookResult = ReturnType<typeof useGetBookingsByUserSuspenseQuery>;
export type GetBookingsByUserQueryResult = Apollo.QueryResult<GetBookingsByUserQuery, GetBookingsByUserQueryVariables>;