import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetReviewsByUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  productId?: Types.InputMaybe<Types.Scalars['Float']['input']>;
}>;


export type GetReviewsByUserIdQuery = { __typename?: 'Query', getReviewsByUserId: Array<{ __typename?: 'Review', id: number, createdAt: any, comment: string, rate: number, edited: boolean }> };


export const GetReviewsByUserIdDocument = gql`
    query GetReviewsByUserId($userId: Int!, $productId: Float) {
  getReviewsByUserId(userId: $userId, productId: $productId) {
    id
    createdAt
    comment
    rate
    edited
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
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetReviewsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables> & ({ variables: GetReviewsByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>(GetReviewsByUserIdDocument, options);
      }
export function useGetReviewsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>(GetReviewsByUserIdDocument, options);
        }
export function useGetReviewsByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>(GetReviewsByUserIdDocument, options);
        }
export type GetReviewsByUserIdQueryHookResult = ReturnType<typeof useGetReviewsByUserIdQuery>;
export type GetReviewsByUserIdLazyQueryHookResult = ReturnType<typeof useGetReviewsByUserIdLazyQuery>;
export type GetReviewsByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetReviewsByUserIdSuspenseQuery>;
export type GetReviewsByUserIdQueryResult = Apollo.QueryResult<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>;