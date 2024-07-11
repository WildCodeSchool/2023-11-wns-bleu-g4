import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllBrandsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllBrandsQuery = { __typename?: 'Query', getAllBrands: { __typename?: 'BrandList', total: number, brands: Array<{ __typename?: 'Brand', name: string, id: number, logo: string }> } };


export const GetAllBrandsDocument = gql`
    query GetAllBrands($limit: Int, $offset: Int) {
  getAllBrands(limit: $limit, offset: $offset) {
    brands {
      name
      id
      logo
    }
    total
  }
}
    `;

/**
 * __useGetAllBrandsQuery__
 *
 * To run a query within a React component, call `useGetAllBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBrandsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetAllBrandsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(GetAllBrandsDocument, options);
      }
export function useGetAllBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(GetAllBrandsDocument, options);
        }
export function useGetAllBrandsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(GetAllBrandsDocument, options);
        }
export type GetAllBrandsQueryHookResult = ReturnType<typeof useGetAllBrandsQuery>;
export type GetAllBrandsLazyQueryHookResult = ReturnType<typeof useGetAllBrandsLazyQuery>;
export type GetAllBrandsSuspenseQueryHookResult = ReturnType<typeof useGetAllBrandsSuspenseQuery>;
export type GetAllBrandsQueryResult = Apollo.QueryResult<GetAllBrandsQuery, GetAllBrandsQueryVariables>;