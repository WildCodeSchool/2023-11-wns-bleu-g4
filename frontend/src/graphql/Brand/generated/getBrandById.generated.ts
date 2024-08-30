import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBrandByIdQueryVariables = Types.Exact<{
  brandId: Types.Scalars['Int']['input'];
}>;


export type GetBrandByIdQuery = { __typename?: 'Query', getBrandById: { __typename?: 'Brand', id: number, name: string, logo: string } };


export const GetBrandByIdDocument = gql`
    query GetBrandById($brandId: Int!) {
  getBrandById(brandId: $brandId) {
    id
    name
    logo
  }
}
    `;

/**
 * __useGetBrandByIdQuery__
 *
 * To run a query within a React component, call `useGetBrandByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandByIdQuery({
 *   variables: {
 *      brandId: // value for 'brandId'
 *   },
 * });
 */
export function useGetBrandByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBrandByIdQuery, GetBrandByIdQueryVariables> & ({ variables: GetBrandByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandByIdQuery, GetBrandByIdQueryVariables>(GetBrandByIdDocument, options);
      }
export function useGetBrandByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandByIdQuery, GetBrandByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandByIdQuery, GetBrandByIdQueryVariables>(GetBrandByIdDocument, options);
        }
export function useGetBrandByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBrandByIdQuery, GetBrandByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandByIdQuery, GetBrandByIdQueryVariables>(GetBrandByIdDocument, options);
        }
export type GetBrandByIdQueryHookResult = ReturnType<typeof useGetBrandByIdQuery>;
export type GetBrandByIdLazyQueryHookResult = ReturnType<typeof useGetBrandByIdLazyQuery>;
export type GetBrandByIdSuspenseQueryHookResult = ReturnType<typeof useGetBrandByIdSuspenseQuery>;
export type GetBrandByIdQueryResult = Apollo.QueryResult<GetBrandByIdQuery, GetBrandByIdQueryVariables>;