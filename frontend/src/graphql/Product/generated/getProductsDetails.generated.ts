import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProductsDetailsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetProductsDetailsQuery = { __typename?: 'Query', getAllProducts: Array<{ __typename?: 'Product', description: string, id: number, name: string, price: number, thumbnail: string, brand: { __typename?: 'Brand', id: number, logo: string, name: string }, characteristics: Array<{ __typename?: 'ProductCharacteristic', id: number, name: string }>, pictures: Array<{ __typename?: 'Product_picture', alt: string, id: number, thumbnail: string }>, reviews?: Array<{ __typename?: 'Review', comment: string, id: number, rate: number }> | null }> };


export const GetProductsDetailsDocument = gql`
    query GetProductsDetails {
  getAllProducts {
    brand {
      id
      logo
      name
    }
    description
    id
    name
    price
    thumbnail
    characteristics {
      id
      name
    }
    pictures {
      alt
      id
      thumbnail
    }
    reviews {
      comment
      id
      rate
    }
  }
}
    `;

/**
 * __useGetProductsDetailsQuery__
 *
 * To run a query within a React component, call `useGetProductsDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsDetailsQuery, GetProductsDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsDetailsQuery, GetProductsDetailsQueryVariables>(GetProductsDetailsDocument, options);
      }
export function useGetProductsDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsDetailsQuery, GetProductsDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsDetailsQuery, GetProductsDetailsQueryVariables>(GetProductsDetailsDocument, options);
        }
export function useGetProductsDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductsDetailsQuery, GetProductsDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsDetailsQuery, GetProductsDetailsQueryVariables>(GetProductsDetailsDocument, options);
        }
export type GetProductsDetailsQueryHookResult = ReturnType<typeof useGetProductsDetailsQuery>;
export type GetProductsDetailsLazyQueryHookResult = ReturnType<typeof useGetProductsDetailsLazyQuery>;
export type GetProductsDetailsSuspenseQueryHookResult = ReturnType<typeof useGetProductsDetailsSuspenseQuery>;
export type GetProductsDetailsQueryResult = Apollo.QueryResult<GetProductsDetailsQuery, GetProductsDetailsQueryVariables>;