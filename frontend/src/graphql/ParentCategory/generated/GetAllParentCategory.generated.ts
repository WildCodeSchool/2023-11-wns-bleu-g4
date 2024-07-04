import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllParentCategoriesQueryVariables = Types.Exact<{
  categoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllParentCategoriesQuery = { __typename?: 'Query', getAllParentCategories: Array<{ __typename?: 'ParentCategory', id: number, name: string, categories: Array<{ __typename?: 'Category', id: number, name: string }> }> };


export const GetAllParentCategoriesDocument = gql`
    query GetAllParentCategories($categoryId: Int) {
  getAllParentCategories(categoryId: $categoryId) {
    id
    name
    categories {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllParentCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllParentCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllParentCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllParentCategoriesQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetAllParentCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllParentCategoriesQuery, GetAllParentCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllParentCategoriesQuery, GetAllParentCategoriesQueryVariables>(GetAllParentCategoriesDocument, options);
      }
export function useGetAllParentCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllParentCategoriesQuery, GetAllParentCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllParentCategoriesQuery, GetAllParentCategoriesQueryVariables>(GetAllParentCategoriesDocument, options);
        }
export function useGetAllParentCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllParentCategoriesQuery, GetAllParentCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllParentCategoriesQuery, GetAllParentCategoriesQueryVariables>(GetAllParentCategoriesDocument, options);
        }
export type GetAllParentCategoriesQueryHookResult = ReturnType<typeof useGetAllParentCategoriesQuery>;
export type GetAllParentCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllParentCategoriesLazyQuery>;
export type GetAllParentCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllParentCategoriesSuspenseQuery>;
export type GetAllParentCategoriesQueryResult = Apollo.QueryResult<GetAllParentCategoriesQuery, GetAllParentCategoriesQueryVariables>;