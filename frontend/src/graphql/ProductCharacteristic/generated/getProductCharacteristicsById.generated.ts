import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProductCharacteristicsByIdQueryVariables = Types.Exact<{
  getProductCharacteristicsByIdId: Types.Scalars['Int']['input'];
}>;


export type GetProductCharacteristicsByIdQuery = { __typename?: 'Query', getProductCharacteristicsById: Array<{ __typename?: 'ProductCharacteristic', id: number, name: string }> };


export const GetProductCharacteristicsByIdDocument = gql`
    query GetProductCharacteristicsById($getProductCharacteristicsByIdId: Int!) {
  getProductCharacteristicsById(id: $getProductCharacteristicsByIdId) {
    id
    name
  }
}
    `;

/**
 * __useGetProductCharacteristicsByIdQuery__
 *
 * To run a query within a React component, call `useGetProductCharacteristicsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductCharacteristicsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductCharacteristicsByIdQuery({
 *   variables: {
 *      getProductCharacteristicsByIdId: // value for 'getProductCharacteristicsByIdId'
 *   },
 * });
 */
export function useGetProductCharacteristicsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductCharacteristicsByIdQuery, GetProductCharacteristicsByIdQueryVariables> & ({ variables: GetProductCharacteristicsByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductCharacteristicsByIdQuery, GetProductCharacteristicsByIdQueryVariables>(GetProductCharacteristicsByIdDocument, options);
      }
export function useGetProductCharacteristicsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductCharacteristicsByIdQuery, GetProductCharacteristicsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductCharacteristicsByIdQuery, GetProductCharacteristicsByIdQueryVariables>(GetProductCharacteristicsByIdDocument, options);
        }
export function useGetProductCharacteristicsByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductCharacteristicsByIdQuery, GetProductCharacteristicsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductCharacteristicsByIdQuery, GetProductCharacteristicsByIdQueryVariables>(GetProductCharacteristicsByIdDocument, options);
        }
export type GetProductCharacteristicsByIdQueryHookResult = ReturnType<typeof useGetProductCharacteristicsByIdQuery>;
export type GetProductCharacteristicsByIdLazyQueryHookResult = ReturnType<typeof useGetProductCharacteristicsByIdLazyQuery>;
export type GetProductCharacteristicsByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductCharacteristicsByIdSuspenseQuery>;
export type GetProductCharacteristicsByIdQueryResult = Apollo.QueryResult<GetProductCharacteristicsByIdQuery, GetProductCharacteristicsByIdQueryVariables>;