import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProductCharacteristicByIdQueryVariables = Types.Exact<{
  productCharacteristicId: Types.Scalars['Int']['input'];
}>;


export type GetProductCharacteristicByIdQuery = { __typename?: 'Query', getProductCharacteristicById: { __typename?: 'ProductCharacteristic', id: number, name: string } };


export const GetProductCharacteristicByIdDocument = gql`
    query GetProductCharacteristicById($productCharacteristicId: Int!) {
  getProductCharacteristicById(productCharacteristicId: $productCharacteristicId) {
    id
    name
  }
}
    `;

/**
 * __useGetProductCharacteristicByIdQuery__
 *
 * To run a query within a React component, call `useGetProductCharacteristicByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductCharacteristicByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductCharacteristicByIdQuery({
 *   variables: {
 *      productCharacteristicId: // value for 'productCharacteristicId'
 *   },
 * });
 */
export function useGetProductCharacteristicByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductCharacteristicByIdQuery, GetProductCharacteristicByIdQueryVariables> & ({ variables: GetProductCharacteristicByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductCharacteristicByIdQuery, GetProductCharacteristicByIdQueryVariables>(GetProductCharacteristicByIdDocument, options);
      }
export function useGetProductCharacteristicByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductCharacteristicByIdQuery, GetProductCharacteristicByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductCharacteristicByIdQuery, GetProductCharacteristicByIdQueryVariables>(GetProductCharacteristicByIdDocument, options);
        }
export function useGetProductCharacteristicByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductCharacteristicByIdQuery, GetProductCharacteristicByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductCharacteristicByIdQuery, GetProductCharacteristicByIdQueryVariables>(GetProductCharacteristicByIdDocument, options);
        }
export type GetProductCharacteristicByIdQueryHookResult = ReturnType<typeof useGetProductCharacteristicByIdQuery>;
export type GetProductCharacteristicByIdLazyQueryHookResult = ReturnType<typeof useGetProductCharacteristicByIdLazyQuery>;
export type GetProductCharacteristicByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductCharacteristicByIdSuspenseQuery>;
export type GetProductCharacteristicByIdQueryResult = Apollo.QueryResult<GetProductCharacteristicByIdQuery, GetProductCharacteristicByIdQueryVariables>;