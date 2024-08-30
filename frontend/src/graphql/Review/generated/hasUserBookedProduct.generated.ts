import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HasUserBookedProductQueryVariables = Types.Exact<{
  productId: Types.Scalars['Int']['input'];
  userId: Types.Scalars['Int']['input'];
}>;


export type HasUserBookedProductQuery = { __typename?: 'Query', hasUserBookedProduct: boolean };


export const HasUserBookedProductDocument = gql`
    query hasUserBookedProduct($productId: Int!, $userId: Int!) {
  hasUserBookedProduct(productId: $productId, userId: $userId)
}
    `;

/**
 * __useHasUserBookedProductQuery__
 *
 * To run a query within a React component, call `useHasUserBookedProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasUserBookedProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasUserBookedProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useHasUserBookedProductQuery(baseOptions: Apollo.QueryHookOptions<HasUserBookedProductQuery, HasUserBookedProductQueryVariables> & ({ variables: HasUserBookedProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasUserBookedProductQuery, HasUserBookedProductQueryVariables>(HasUserBookedProductDocument, options);
      }
export function useHasUserBookedProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasUserBookedProductQuery, HasUserBookedProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasUserBookedProductQuery, HasUserBookedProductQueryVariables>(HasUserBookedProductDocument, options);
        }
export function useHasUserBookedProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HasUserBookedProductQuery, HasUserBookedProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HasUserBookedProductQuery, HasUserBookedProductQueryVariables>(HasUserBookedProductDocument, options);
        }
export type HasUserBookedProductQueryHookResult = ReturnType<typeof useHasUserBookedProductQuery>;
export type HasUserBookedProductLazyQueryHookResult = ReturnType<typeof useHasUserBookedProductLazyQuery>;
export type HasUserBookedProductSuspenseQueryHookResult = ReturnType<typeof useHasUserBookedProductSuspenseQuery>;
export type HasUserBookedProductQueryResult = Apollo.QueryResult<HasUserBookedProductQuery, HasUserBookedProductQueryVariables>;