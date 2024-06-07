import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSubCategoryByIdQueryVariables = Types.Exact<{
  subCategoryId: Types.Scalars['Int'];
}>;


export type GetSubCategoryByIdQuery = { __typename?: 'Query', getSubCategoryById: { __typename?: 'SubCategory', id: number, name: string, thumbnail: string } };


export const GetSubCategoryByIdDocument = gql`
    query GetSubCategoryById($subCategoryId: Int!) {
  getSubCategoryById(subCategoryId: $subCategoryId) {
    id
    name
    thumbnail
  }
}
    `;

/**
 * __useGetSubCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetSubCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubCategoryByIdQuery({
 *   variables: {
 *      subCategoryId: // value for 'subCategoryId'
 *   },
 * });
 */
export function useGetSubCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSubCategoryByIdQuery, GetSubCategoryByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubCategoryByIdQuery, GetSubCategoryByIdQueryVariables>(GetSubCategoryByIdDocument, options);
      }
export function useGetSubCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubCategoryByIdQuery, GetSubCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubCategoryByIdQuery, GetSubCategoryByIdQueryVariables>(GetSubCategoryByIdDocument, options);
        }
export type GetSubCategoryByIdQueryHookResult = ReturnType<typeof useGetSubCategoryByIdQuery>;
export type GetSubCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetSubCategoryByIdLazyQuery>;
export type GetSubCategoryByIdQueryResult = Apollo.QueryResult<GetSubCategoryByIdQuery, GetSubCategoryByIdQueryVariables>;