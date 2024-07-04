import * as Types from "../../generated/schema";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetProductCodesByStatusQueryVariables = Types.Exact<{
  status: Types.Status;
}>;

export type GetProductCodesByStatusQuery = {
  __typename?: "Query";
  getProductCodesByStatus: Array<{ __typename?: "ProductCode"; id: number; status: Types.Status }>;
};

export const GetProductCodesByStatusDocument = gql`
  query GetProductCodesByStatus($status: Status!) {
    getProductCodesByStatus(status: $status) {
      id
      status
    }
  }
`;

/**
 * __useGetProductCodesByStatusQuery__
 *
 * To run a query within a React component, call `useGetProductCodesByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductCodesByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductCodesByStatusQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetProductCodesByStatusQuery(
  baseOptions: Apollo.QueryHookOptions<GetProductCodesByStatusQuery, GetProductCodesByStatusQueryVariables> &
    ({ variables: GetProductCodesByStatusQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProductCodesByStatusQuery, GetProductCodesByStatusQueryVariables>(
    GetProductCodesByStatusDocument,
    options,
  );
}
export function useGetProductCodesByStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProductCodesByStatusQuery, GetProductCodesByStatusQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProductCodesByStatusQuery, GetProductCodesByStatusQueryVariables>(
    GetProductCodesByStatusDocument,
    options,
  );
}
export function useGetProductCodesByStatusSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductCodesByStatusQuery, GetProductCodesByStatusQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetProductCodesByStatusQuery, GetProductCodesByStatusQueryVariables>(
    GetProductCodesByStatusDocument,
    options,
  );
}
export type GetProductCodesByStatusQueryHookResult = ReturnType<typeof useGetProductCodesByStatusQuery>;
export type GetProductCodesByStatusLazyQueryHookResult = ReturnType<typeof useGetProductCodesByStatusLazyQuery>;
export type GetProductCodesByStatusSuspenseQueryHookResult = ReturnType<typeof useGetProductCodesByStatusSuspenseQuery>;
export type GetProductCodesByStatusQueryResult = Apollo.QueryResult<
  GetProductCodesByStatusQuery,
  GetProductCodesByStatusQueryVariables
>;
