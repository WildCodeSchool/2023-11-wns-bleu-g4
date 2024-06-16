import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllProduct_CodesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllProduct_CodesQuery = { __typename?: 'Query', getAllProduct_codes: Array<{ __typename?: 'ProductCode', id: number, status: Types.Status }> };


export const GetAllProduct_CodesDocument = gql`
    query GetAllProduct_codes {
  getAllProduct_codes {
    id
    status
  }
}
    `;

/**
 * __useGetAllProduct_CodesQuery__
 *
 * To run a query within a React component, call `useGetAllProduct_CodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProduct_CodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProduct_CodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProduct_CodesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProduct_CodesQuery, GetAllProduct_CodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProduct_CodesQuery, GetAllProduct_CodesQueryVariables>(GetAllProduct_CodesDocument, options);
      }
export function useGetAllProduct_CodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProduct_CodesQuery, GetAllProduct_CodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProduct_CodesQuery, GetAllProduct_CodesQueryVariables>(GetAllProduct_CodesDocument, options);
        }
export type GetAllProduct_CodesQueryHookResult = ReturnType<typeof useGetAllProduct_CodesQuery>;
export type GetAllProduct_CodesLazyQueryHookResult = ReturnType<typeof useGetAllProduct_CodesLazyQuery>;
export type GetAllProduct_CodesQueryResult = Apollo.QueryResult<GetAllProduct_CodesQuery, GetAllProduct_CodesQueryVariables>;