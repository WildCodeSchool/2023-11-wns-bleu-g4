import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllSubCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllSubCategoriesQuery = { __typename?: 'Query', getAllSubCategories: Array<{ __typename?: 'SubCategory', id: number, name: string, thumbnail: string }> };


export const GetAllSubCategoriesDocument = gql`
    query GetAllSubCategories {
  getAllSubCategories {
    id
    name
    thumbnail
  }
}
    `;

/**
 * __useGetAllSubCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllSubCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSubCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSubCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSubCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSubCategoriesQuery, GetAllSubCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSubCategoriesQuery, GetAllSubCategoriesQueryVariables>(GetAllSubCategoriesDocument, options);
      }
export function useGetAllSubCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSubCategoriesQuery, GetAllSubCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSubCategoriesQuery, GetAllSubCategoriesQueryVariables>(GetAllSubCategoriesDocument, options);
        }
export type GetAllSubCategoriesQueryHookResult = ReturnType<typeof useGetAllSubCategoriesQuery>;
export type GetAllSubCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllSubCategoriesLazyQuery>;
export type GetAllSubCategoriesQueryResult = Apollo.QueryResult<GetAllSubCategoriesQuery, GetAllSubCategoriesQueryVariables>;