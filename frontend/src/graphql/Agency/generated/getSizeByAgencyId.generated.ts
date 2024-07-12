import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSizeByAgencyIdQueryVariables = Types.Exact<{
  agencyId: Types.Scalars['Int']['input'];
}>;


export type GetSizeByAgencyIdQuery = { __typename?: 'Query', getAgencyById: { __typename?: 'Agency', productCodes: Array<{ __typename?: 'ProductCode', isSizeable: boolean, size?: string | null, product?: { __typename?: 'Product', id: number } | null }> } };


export const GetSizeByAgencyIdDocument = gql`
    query getSizeByAgencyId($agencyId: Int!) {
  getAgencyById(agencyId: $agencyId) {
    productCodes {
      isSizeable
      size
      product {
        id
      }
    }
  }
}
    `;

/**
 * __useGetSizeByAgencyIdQuery__
 *
 * To run a query within a React component, call `useGetSizeByAgencyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSizeByAgencyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSizeByAgencyIdQuery({
 *   variables: {
 *      agencyId: // value for 'agencyId'
 *   },
 * });
 */
export function useGetSizeByAgencyIdQuery(baseOptions: Apollo.QueryHookOptions<GetSizeByAgencyIdQuery, GetSizeByAgencyIdQueryVariables> & ({ variables: GetSizeByAgencyIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSizeByAgencyIdQuery, GetSizeByAgencyIdQueryVariables>(GetSizeByAgencyIdDocument, options);
      }
export function useGetSizeByAgencyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSizeByAgencyIdQuery, GetSizeByAgencyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSizeByAgencyIdQuery, GetSizeByAgencyIdQueryVariables>(GetSizeByAgencyIdDocument, options);
        }
export function useGetSizeByAgencyIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSizeByAgencyIdQuery, GetSizeByAgencyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSizeByAgencyIdQuery, GetSizeByAgencyIdQueryVariables>(GetSizeByAgencyIdDocument, options);
        }
export type GetSizeByAgencyIdQueryHookResult = ReturnType<typeof useGetSizeByAgencyIdQuery>;
export type GetSizeByAgencyIdLazyQueryHookResult = ReturnType<typeof useGetSizeByAgencyIdLazyQuery>;
export type GetSizeByAgencyIdSuspenseQueryHookResult = ReturnType<typeof useGetSizeByAgencyIdSuspenseQuery>;
export type GetSizeByAgencyIdQueryResult = Apollo.QueryResult<GetSizeByAgencyIdQuery, GetSizeByAgencyIdQueryVariables>;