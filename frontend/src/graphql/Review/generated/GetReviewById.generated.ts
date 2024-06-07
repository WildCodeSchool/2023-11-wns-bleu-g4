import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetReviewByIdQueryVariables = Types.Exact<{
  reviewId: Types.Scalars['Int'];
}>;


export type GetReviewByIdQuery = { __typename?: 'Query', getReviewById: { __typename?: 'Review', id: number, rate: number, comment: string, product?: { __typename?: 'Product', id: number } | null, user?: { __typename?: 'User', id: number } | null } };


export const GetReviewByIdDocument = gql`
    query GetReviewById($reviewId: Int!) {
  getReviewById(reviewId: $reviewId) {
    id
    rate
    comment
    product {
      id
    }
    user {
      id
    }
  }
}
    `;

/**
 * __useGetReviewByIdQuery__
 *
 * To run a query within a React component, call `useGetReviewByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewByIdQuery({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useGetReviewByIdQuery(baseOptions: Apollo.QueryHookOptions<GetReviewByIdQuery, GetReviewByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewByIdQuery, GetReviewByIdQueryVariables>(GetReviewByIdDocument, options);
      }
export function useGetReviewByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewByIdQuery, GetReviewByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewByIdQuery, GetReviewByIdQueryVariables>(GetReviewByIdDocument, options);
        }
export type GetReviewByIdQueryHookResult = ReturnType<typeof useGetReviewByIdQuery>;
export type GetReviewByIdLazyQueryHookResult = ReturnType<typeof useGetReviewByIdLazyQuery>;
export type GetReviewByIdQueryResult = Apollo.QueryResult<GetReviewByIdQuery, GetReviewByIdQueryVariables>;