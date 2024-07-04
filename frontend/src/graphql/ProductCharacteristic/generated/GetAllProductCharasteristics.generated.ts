import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllProductCharacteristicsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllProductCharacteristicsQuery = { __typename?: 'Query', getAllProductCharacteristics: Array<{ __typename?: 'ProductCharacteristic', id: number, characteristic: string }> };


export const GetAllProductCharacteristicsDocument = gql`
    query GetAllProductCharacteristics {
  getAllProductCharacteristics {
    id
    characteristic
  }
}
    `;

/**
 * __useGetAllProductCharacteristicsQuery__
 *
 * To run a query within a React component, call `useGetAllProductCharacteristicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductCharacteristicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductCharacteristicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProductCharacteristicsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductCharacteristicsQuery, GetAllProductCharacteristicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductCharacteristicsQuery, GetAllProductCharacteristicsQueryVariables>(GetAllProductCharacteristicsDocument, options);
      }
export function useGetAllProductCharacteristicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductCharacteristicsQuery, GetAllProductCharacteristicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductCharacteristicsQuery, GetAllProductCharacteristicsQueryVariables>(GetAllProductCharacteristicsDocument, options);
        }
export function useGetAllProductCharacteristicsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllProductCharacteristicsQuery, GetAllProductCharacteristicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProductCharacteristicsQuery, GetAllProductCharacteristicsQueryVariables>(GetAllProductCharacteristicsDocument, options);
        }
export type GetAllProductCharacteristicsQueryHookResult = ReturnType<typeof useGetAllProductCharacteristicsQuery>;
export type GetAllProductCharacteristicsLazyQueryHookResult = ReturnType<typeof useGetAllProductCharacteristicsLazyQuery>;
export type GetAllProductCharacteristicsSuspenseQueryHookResult = ReturnType<typeof useGetAllProductCharacteristicsSuspenseQuery>;
export type GetAllProductCharacteristicsQueryResult = Apollo.QueryResult<GetAllProductCharacteristicsQuery, GetAllProductCharacteristicsQueryVariables>;