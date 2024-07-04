import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllProduct_PicturesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllProduct_PicturesQuery = { __typename?: 'Query', getAllProduct_pictures: Array<{ __typename?: 'Product_picture', id: number, thumbnail: string, alt: string }> };


export const GetAllProduct_PicturesDocument = gql`
    query GetAllProduct_pictures {
  getAllProduct_pictures {
    id
    thumbnail
    alt
  }
}
    `;

/**
 * __useGetAllProduct_PicturesQuery__
 *
 * To run a query within a React component, call `useGetAllProduct_PicturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProduct_PicturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProduct_PicturesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProduct_PicturesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProduct_PicturesQuery, GetAllProduct_PicturesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProduct_PicturesQuery, GetAllProduct_PicturesQueryVariables>(GetAllProduct_PicturesDocument, options);
      }
export function useGetAllProduct_PicturesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProduct_PicturesQuery, GetAllProduct_PicturesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProduct_PicturesQuery, GetAllProduct_PicturesQueryVariables>(GetAllProduct_PicturesDocument, options);
        }
export function useGetAllProduct_PicturesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllProduct_PicturesQuery, GetAllProduct_PicturesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProduct_PicturesQuery, GetAllProduct_PicturesQueryVariables>(GetAllProduct_PicturesDocument, options);
        }
export type GetAllProduct_PicturesQueryHookResult = ReturnType<typeof useGetAllProduct_PicturesQuery>;
export type GetAllProduct_PicturesLazyQueryHookResult = ReturnType<typeof useGetAllProduct_PicturesLazyQuery>;
export type GetAllProduct_PicturesSuspenseQueryHookResult = ReturnType<typeof useGetAllProduct_PicturesSuspenseQuery>;
export type GetAllProduct_PicturesQueryResult = Apollo.QueryResult<GetAllProduct_PicturesQuery, GetAllProduct_PicturesQueryVariables>;