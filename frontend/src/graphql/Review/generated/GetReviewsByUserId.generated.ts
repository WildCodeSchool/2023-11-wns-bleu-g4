import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetReviewsByUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int'];
}>;


export type GetReviewsByUserIdQuery = { __typename?: 'Query', getReviewsByUserId: Array<{ __typename?: 'Review', id: number, rate: number, comment: string, product?: { __typename?: 'Product', id: number } | null }> };


export const GetReviewsByUserIdDocument = gql`
    query GetReviewsByUserId($userId: Int!) {
  getReviewsByUserId(userId: $userId) {
    id
    rate
    comment
    product {
      id
    }
  }
}
    `;

/**
 * __useGetReviewsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetReviewsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetReviewsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>(GetReviewsByUserIdDocument, options);
      }
export function useGetReviewsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>(GetReviewsByUserIdDocument, options);
        }
export type GetReviewsByUserIdQueryHookResult = ReturnType<typeof useGetReviewsByUserIdQuery>;
export type GetReviewsByUserIdLazyQueryHookResult = ReturnType<typeof useGetReviewsByUserIdLazyQuery>;
export type GetReviewsByUserIdQueryResult = Apollo.QueryResult<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>;