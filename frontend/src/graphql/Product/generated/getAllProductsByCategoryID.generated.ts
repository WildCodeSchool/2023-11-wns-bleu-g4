import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllProductsByCategoryIdQueryVariables = Types.Exact<{
  categoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllProductsByCategoryIdQuery = { __typename?: 'Query', getAllProducts: Array<{ __typename?: 'Product', description: string, id: number, name: string, price: number, thumbnail: string, brand: { __typename?: 'Brand', id: number, logo: string, name: string }, characteristics: Array<{ __typename?: 'ProductCharacteristic', characteristic: string, id: number }>, pictures: Array<{ __typename?: 'Product_picture', alt: string, id: number, thumbnail: string }>, reviews?: Array<{ __typename?: 'Review', comment: string, id: number, rate: number }> | null, category: { __typename?: 'Category', id: number } }> };


export const GetAllProductsByCategoryIdDocument = gql`
    query getAllProductsByCategoryID($categoryId: Int) {
  getAllProducts(categoryId: $categoryId) {
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
      characteristic
      id
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
    category {
      id
    }
  }
}
    `;

/**
 * __useGetAllProductsByCategoryIdQuery__
 *
 * To run a query within a React component, call `useGetAllProductsByCategoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsByCategoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsByCategoryIdQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetAllProductsByCategoryIdQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsByCategoryIdQuery, GetAllProductsByCategoryIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsByCategoryIdQuery, GetAllProductsByCategoryIdQueryVariables>(GetAllProductsByCategoryIdDocument, options);
      }
export function useGetAllProductsByCategoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsByCategoryIdQuery, GetAllProductsByCategoryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsByCategoryIdQuery, GetAllProductsByCategoryIdQueryVariables>(GetAllProductsByCategoryIdDocument, options);
        }
export function useGetAllProductsByCategoryIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllProductsByCategoryIdQuery, GetAllProductsByCategoryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProductsByCategoryIdQuery, GetAllProductsByCategoryIdQueryVariables>(GetAllProductsByCategoryIdDocument, options);
        }
export type GetAllProductsByCategoryIdQueryHookResult = ReturnType<typeof useGetAllProductsByCategoryIdQuery>;
export type GetAllProductsByCategoryIdLazyQueryHookResult = ReturnType<typeof useGetAllProductsByCategoryIdLazyQuery>;
export type GetAllProductsByCategoryIdSuspenseQueryHookResult = ReturnType<typeof useGetAllProductsByCategoryIdSuspenseQuery>;
export type GetAllProductsByCategoryIdQueryResult = Apollo.QueryResult<GetAllProductsByCategoryIdQuery, GetAllProductsByCategoryIdQueryVariables>;