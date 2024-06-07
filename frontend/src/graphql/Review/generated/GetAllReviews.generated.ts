import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllReviewsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllReviewsQuery = { __typename?: 'Query', getAllReviews: Array<{ __typename?: 'Review', id: number, rate: number, comment: string, product?: { __typename?: 'Product', id: number } | null, user?: { __typename?: 'User', id: number } | null }> };


export const GetAllReviewsDocument = gql`
    query GetAllReviews {
  getAllReviews {
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
 * __useGetAllReviewsQuery__
 *
 * To run a query within a React component, call `useGetAllReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllReviewsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllReviewsQuery, GetAllReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReviewsQuery, GetAllReviewsQueryVariables>(GetAllReviewsDocument, options);
      }
export function useGetAllReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReviewsQuery, GetAllReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReviewsQuery, GetAllReviewsQueryVariables>(GetAllReviewsDocument, options);
        }
export type GetAllReviewsQueryHookResult = ReturnType<typeof useGetAllReviewsQuery>;
export type GetAllReviewsLazyQueryHookResult = ReturnType<typeof useGetAllReviewsLazyQuery>;
export type GetAllReviewsQueryResult = Apollo.QueryResult<GetAllReviewsQuery, GetAllReviewsQueryVariables>;