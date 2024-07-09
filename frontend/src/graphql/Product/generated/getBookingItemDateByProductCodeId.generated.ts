import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBookingItemDatesByProductCodeIdQueryVariables = Types.Exact<{
  productCodeId: Types.Scalars['Int']['input'];
  agencyId?: Types.InputMaybe<Types.Scalars['Float']['input']>;
}>;


export type GetBookingItemDatesByProductCodeIdQuery = { __typename?: 'Query', getBookingItemDatesByProductCodeId: Array<{ __typename?: 'BookingItem', startDate: any, endDate: any }> };


export const GetBookingItemDatesByProductCodeIdDocument = gql`
    query GetBookingItemDatesByProductCodeId($productCodeId: Int!, $agencyId: Float) {
  getBookingItemDatesByProductCodeId(
    productCodeId: $productCodeId
    agencyId: $agencyId
  ) {
    startDate
    endDate
  }
}
    `;

/**
 * __useGetBookingItemDatesByProductCodeIdQuery__
 *
 * To run a query within a React component, call `useGetBookingItemDatesByProductCodeIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingItemDatesByProductCodeIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingItemDatesByProductCodeIdQuery({
 *   variables: {
 *      productCodeId: // value for 'productCodeId'
 *      agencyId: // value for 'agencyId'
 *   },
 * });
 */
export function useGetBookingItemDatesByProductCodeIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookingItemDatesByProductCodeIdQuery, GetBookingItemDatesByProductCodeIdQueryVariables> & ({ variables: GetBookingItemDatesByProductCodeIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingItemDatesByProductCodeIdQuery, GetBookingItemDatesByProductCodeIdQueryVariables>(GetBookingItemDatesByProductCodeIdDocument, options);
      }
export function useGetBookingItemDatesByProductCodeIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingItemDatesByProductCodeIdQuery, GetBookingItemDatesByProductCodeIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingItemDatesByProductCodeIdQuery, GetBookingItemDatesByProductCodeIdQueryVariables>(GetBookingItemDatesByProductCodeIdDocument, options);
        }
export function useGetBookingItemDatesByProductCodeIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookingItemDatesByProductCodeIdQuery, GetBookingItemDatesByProductCodeIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookingItemDatesByProductCodeIdQuery, GetBookingItemDatesByProductCodeIdQueryVariables>(GetBookingItemDatesByProductCodeIdDocument, options);
        }
export type GetBookingItemDatesByProductCodeIdQueryHookResult = ReturnType<typeof useGetBookingItemDatesByProductCodeIdQuery>;
export type GetBookingItemDatesByProductCodeIdLazyQueryHookResult = ReturnType<typeof useGetBookingItemDatesByProductCodeIdLazyQuery>;
export type GetBookingItemDatesByProductCodeIdSuspenseQueryHookResult = ReturnType<typeof useGetBookingItemDatesByProductCodeIdSuspenseQuery>;
export type GetBookingItemDatesByProductCodeIdQueryResult = Apollo.QueryResult<GetBookingItemDatesByProductCodeIdQuery, GetBookingItemDatesByProductCodeIdQueryVariables>;