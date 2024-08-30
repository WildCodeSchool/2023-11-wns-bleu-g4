import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAgencyByIdQueryVariables = Types.Exact<{
  agencyId: Types.Scalars['Int']['input'];
}>;


export type GetAgencyByIdQuery = { __typename?: 'Query', getAgencyById: { __typename?: 'Agency', address: string, city: string, country: string, email: string, id: number, name: string, phone: string, postcode: string, productCodes: Array<{ __typename?: 'ProductCode', id: number, size?: string | null, bookingItems: Array<{ __typename?: 'BookingItem', endDate: any, startDate: any }>, product?: { __typename?: 'Product', id: number } | null }> } };


export const GetAgencyByIdDocument = gql`
    query GetAgencyById($agencyId: Int!) {
  getAgencyById(agencyId: $agencyId) {
    address
    city
    country
    email
    id
    name
    phone
    postcode
    productCodes {
      id
      bookingItems {
        endDate
        startDate
      }
      size
      product {
        id
      }
    }
  }
}
    `;

/**
 * __useGetAgencyByIdQuery__
 *
 * To run a query within a React component, call `useGetAgencyByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAgencyByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAgencyByIdQuery({
 *   variables: {
 *      agencyId: // value for 'agencyId'
 *   },
 * });
 */
export function useGetAgencyByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAgencyByIdQuery, GetAgencyByIdQueryVariables> & ({ variables: GetAgencyByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAgencyByIdQuery, GetAgencyByIdQueryVariables>(GetAgencyByIdDocument, options);
      }
export function useGetAgencyByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAgencyByIdQuery, GetAgencyByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAgencyByIdQuery, GetAgencyByIdQueryVariables>(GetAgencyByIdDocument, options);
        }
export function useGetAgencyByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAgencyByIdQuery, GetAgencyByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAgencyByIdQuery, GetAgencyByIdQueryVariables>(GetAgencyByIdDocument, options);
        }
export type GetAgencyByIdQueryHookResult = ReturnType<typeof useGetAgencyByIdQuery>;
export type GetAgencyByIdLazyQueryHookResult = ReturnType<typeof useGetAgencyByIdLazyQuery>;
export type GetAgencyByIdSuspenseQueryHookResult = ReturnType<typeof useGetAgencyByIdSuspenseQuery>;
export type GetAgencyByIdQueryResult = Apollo.QueryResult<GetAgencyByIdQuery, GetAgencyByIdQueryVariables>;