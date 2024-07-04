import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllParentCategoryQueryVariables = Types.Exact<{
  categoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllParentCategoryQuery = { __typename?: 'Query', getAllParentCategories: Array<{ __typename?: 'ParentCategory', id: number, name: string, categories: Array<{ __typename?: 'Category', id: number, name: string }> }> };


export const GetAllParentCategoryDocument = gql`
    query GetAllParentCategory($categoryId: Int) {
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
 * __useGetAllParentCategoryQuery__
 *
 * To run a query within a React component, call `useGetAllParentCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllParentCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllParentCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetAllParentCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetAllParentCategoryQuery, GetAllParentCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllParentCategoryQuery, GetAllParentCategoryQueryVariables>(GetAllParentCategoryDocument, options);
      }
export function useGetAllParentCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllParentCategoryQuery, GetAllParentCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllParentCategoryQuery, GetAllParentCategoryQueryVariables>(GetAllParentCategoryDocument, options);
        }
export function useGetAllParentCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllParentCategoryQuery, GetAllParentCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllParentCategoryQuery, GetAllParentCategoryQueryVariables>(GetAllParentCategoryDocument, options);
        }
export type GetAllParentCategoryQueryHookResult = ReturnType<typeof useGetAllParentCategoryQuery>;
export type GetAllParentCategoryLazyQueryHookResult = ReturnType<typeof useGetAllParentCategoryLazyQuery>;
export type GetAllParentCategorySuspenseQueryHookResult = ReturnType<typeof useGetAllParentCategorySuspenseQuery>;
export type GetAllParentCategoryQueryResult = Apollo.QueryResult<GetAllParentCategoryQuery, GetAllParentCategoryQueryVariables>;