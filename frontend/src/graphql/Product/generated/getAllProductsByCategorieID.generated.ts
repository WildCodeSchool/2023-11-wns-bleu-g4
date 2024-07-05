import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllProductsByCategoryIdQueryVariables = Types.Exact<{
  categoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortOrder?: Types.InputMaybe<Types.SortProduct>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllProductsByCategoryIdQuery = { __typename?: 'Query', getAllProducts: { __typename?: 'ProductList', total: number, products: Array<{ __typename?: 'Product', id: number, name: string, price: number, description: string, thumbnail: string, brand: { __typename?: 'Brand', id: number, name: string, logo: string }, category: { __typename?: 'Category', id: number, name: string }, characteristics: Array<{ __typename?: 'ProductCharacteristic', id: number, characteristic: string }>, pictures: Array<{ __typename?: 'Product_picture', id: number, alt: string, thumbnail: string }>, reviews?: Array<{ __typename?: 'Review', id: number, rate: number, comment: string }> | null }> } };


export const GetAllProductsByCategoryIdDocument = gql`
    query getAllProductsByCategoryID($categoryId: Int, $name: String, $sortOrder: SortProduct, $limit: Int, $offset: Int) {
  getAllProducts(
    categoryId: $categoryId
    name: $name
    sortOrder: $sortOrder
    limit: $limit
    offset: $offset
  ) {
    products {
      id
      name
      price
      description
      thumbnail
      brand {
        id
        name
        logo
      }
      category {
        id
        name
      }
      characteristics {
        id
        characteristic
      }
      pictures {
        id
        alt
        thumbnail
      }
      reviews {
        id
        rate
        comment
      }
    }
    total
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
 *      name: // value for 'name'
 *      sortOrder: // value for 'sortOrder'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
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