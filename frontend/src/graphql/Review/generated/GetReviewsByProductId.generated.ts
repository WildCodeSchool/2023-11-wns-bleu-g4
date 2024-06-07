import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetReviewsByProductIdQueryVariables = Types.Exact<{
  productId: Types.Scalars['Float'];
}>;


export type GetReviewsByProductIdQuery = { __typename?: 'Query', getReviewsByProductId: Array<{ __typename?: 'Review', id: number, rate: number, comment: string, user?: { __typename?: 'User', id: number } | null }> };


export const GetReviewsByProductIdDocument = gql`
    query GetReviewsByProductId($productId: Float!) {
  getReviewsByProductId(productId: $productId) {
    id
    rate
    comment
    user {
      id
    }
  }
}
    `;

/**
 * __useGetReviewsByProductIdQuery__
 *
 * To run a query within a React component, call `useGetReviewsByProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsByProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsByProductIdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetReviewsByProductIdQuery(baseOptions: Apollo.QueryHookOptions<GetReviewsByProductIdQuery, GetReviewsByProductIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsByProductIdQuery, GetReviewsByProductIdQueryVariables>(GetReviewsByProductIdDocument, options);
      }
export function useGetReviewsByProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByProductIdQuery, GetReviewsByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsByProductIdQuery, GetReviewsByProductIdQueryVariables>(GetReviewsByProductIdDocument, options);
        }
export type GetReviewsByProductIdQueryHookResult = ReturnType<typeof useGetReviewsByProductIdQuery>;
export type GetReviewsByProductIdLazyQueryHookResult = ReturnType<typeof useGetReviewsByProductIdLazyQuery>;
export type GetReviewsByProductIdQueryResult = Apollo.QueryResult<GetReviewsByProductIdQuery, GetReviewsByProductIdQueryVariables>;