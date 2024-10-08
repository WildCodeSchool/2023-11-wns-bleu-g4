import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllReviewsQueryVariables = Types.Exact<{
  productId: Types.Scalars['Int']['input'];
}>;


export type GetAllReviewsQuery = { __typename?: 'Query', getAllReviews: Array<{ __typename?: 'Review', comment: string, id: number, rate: number, createdAt: any, edited: boolean, user: { __typename?: 'User', id: number, avatar: string, firstname: string, name: string } }> };


export const GetAllReviewsDocument = gql`
    query GetAllReviews($productId: Int!) {
  getAllReviews(productId: $productId) {
    comment
    id
    rate
    createdAt
    edited
    user {
      id
      avatar
      firstname
      name
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
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetAllReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetAllReviewsQuery, GetAllReviewsQueryVariables> & ({ variables: GetAllReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReviewsQuery, GetAllReviewsQueryVariables>(GetAllReviewsDocument, options);
      }
export function useGetAllReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReviewsQuery, GetAllReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReviewsQuery, GetAllReviewsQueryVariables>(GetAllReviewsDocument, options);
        }
export function useGetAllReviewsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllReviewsQuery, GetAllReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllReviewsQuery, GetAllReviewsQueryVariables>(GetAllReviewsDocument, options);
        }
export type GetAllReviewsQueryHookResult = ReturnType<typeof useGetAllReviewsQuery>;
export type GetAllReviewsLazyQueryHookResult = ReturnType<typeof useGetAllReviewsLazyQuery>;
export type GetAllReviewsSuspenseQueryHookResult = ReturnType<typeof useGetAllReviewsSuspenseQuery>;
export type GetAllReviewsQueryResult = Apollo.QueryResult<GetAllReviewsQuery, GetAllReviewsQueryVariables>;