import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProductCodesByProductIdQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  productId: Types.Scalars['Int']['input'];
}>;


export type GetProductCodesByProductIdQuery = { __typename?: 'Query', getProductCodesByProductId: { __typename?: 'ProductCodeList', total: number, productCodes: Array<{ __typename?: 'ProductCode', id: number, isSizeable: boolean, size?: string | null, status: Types.Status, agency?: { __typename?: 'Agency', id: number, name: string } | null, product?: { __typename?: 'Product', id: number } | null }> } };


export const GetProductCodesByProductIdDocument = gql`
    query GetProductCodesByProductId($limit: Int, $offset: Int, $productId: Int!) {
  getProductCodesByProductId(
    limit: $limit
    offset: $offset
    productId: $productId
  ) {
    productCodes {
      agency {
        id
        name
      }
      id
      isSizeable
      product {
        id
      }
      size
      status
    }
    total
  }
}
    `;

/**
 * __useGetProductCodesByProductIdQuery__
 *
 * To run a query within a React component, call `useGetProductCodesByProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductCodesByProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductCodesByProductIdQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductCodesByProductIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductCodesByProductIdQuery, GetProductCodesByProductIdQueryVariables> & ({ variables: GetProductCodesByProductIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductCodesByProductIdQuery, GetProductCodesByProductIdQueryVariables>(GetProductCodesByProductIdDocument, options);
      }
export function useGetProductCodesByProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductCodesByProductIdQuery, GetProductCodesByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductCodesByProductIdQuery, GetProductCodesByProductIdQueryVariables>(GetProductCodesByProductIdDocument, options);
        }
export function useGetProductCodesByProductIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductCodesByProductIdQuery, GetProductCodesByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductCodesByProductIdQuery, GetProductCodesByProductIdQueryVariables>(GetProductCodesByProductIdDocument, options);
        }
export type GetProductCodesByProductIdQueryHookResult = ReturnType<typeof useGetProductCodesByProductIdQuery>;
export type GetProductCodesByProductIdLazyQueryHookResult = ReturnType<typeof useGetProductCodesByProductIdLazyQuery>;
export type GetProductCodesByProductIdSuspenseQueryHookResult = ReturnType<typeof useGetProductCodesByProductIdSuspenseQuery>;
export type GetProductCodesByProductIdQueryResult = Apollo.QueryResult<GetProductCodesByProductIdQuery, GetProductCodesByProductIdQueryVariables>;