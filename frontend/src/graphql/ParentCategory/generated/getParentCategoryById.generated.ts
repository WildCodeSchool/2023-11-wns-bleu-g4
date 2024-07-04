import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetParentCategoryByIdQueryVariables = Types.Exact<{
  parentCategoryId: Types.Scalars['Int']['input'];
}>;


export type GetParentCategoryByIdQuery = { __typename?: 'Query', getParentCategoryById: { __typename?: 'ParentCategory', id: number, name: string } };


export const GetParentCategoryByIdDocument = gql`
    query GetParentCategoryById($parentCategoryId: Int!) {
  getParentCategoryById(parentCategoryId: $parentCategoryId) {
    id
    name
  }
}
    `;

/**
 * __useGetParentCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetParentCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParentCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParentCategoryByIdQuery({
 *   variables: {
 *      parentCategoryId: // value for 'parentCategoryId'
 *   },
 * });
 */
export function useGetParentCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetParentCategoryByIdQuery, GetParentCategoryByIdQueryVariables> & ({ variables: GetParentCategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetParentCategoryByIdQuery, GetParentCategoryByIdQueryVariables>(GetParentCategoryByIdDocument, options);
      }
export function useGetParentCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetParentCategoryByIdQuery, GetParentCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetParentCategoryByIdQuery, GetParentCategoryByIdQueryVariables>(GetParentCategoryByIdDocument, options);
        }
export function useGetParentCategoryByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetParentCategoryByIdQuery, GetParentCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetParentCategoryByIdQuery, GetParentCategoryByIdQueryVariables>(GetParentCategoryByIdDocument, options);
        }
export type GetParentCategoryByIdQueryHookResult = ReturnType<typeof useGetParentCategoryByIdQuery>;
export type GetParentCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetParentCategoryByIdLazyQuery>;
export type GetParentCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetParentCategoryByIdSuspenseQuery>;
export type GetParentCategoryByIdQueryResult = Apollo.QueryResult<GetParentCategoryByIdQuery, GetParentCategoryByIdQueryVariables>;