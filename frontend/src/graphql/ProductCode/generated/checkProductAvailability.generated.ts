import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckProductAvailabilityQueryVariables = Types.Exact<{
  agencyId: Types.Scalars['Int']['input'];
  productId: Types.Scalars['Int']['input'];
  startDate: Types.Scalars['DateTimeISO']['input'];
  endDate: Types.Scalars['DateTimeISO']['input'];
  quantity: Types.Scalars['Int']['input'];
  size?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CheckProductAvailabilityQuery = { __typename?: 'Query', checkProductAvailability: boolean };


export const CheckProductAvailabilityDocument = gql`
    query checkProductAvailability($agencyId: Int!, $productId: Int!, $startDate: DateTimeISO!, $endDate: DateTimeISO!, $quantity: Int!, $size: String) {
  checkProductAvailability(
    agencyId: $agencyId
    productId: $productId
    startDate: $startDate
    endDate: $endDate
    quantity: $quantity
    size: $size
  )
}
    `;

/**
 * __useCheckProductAvailabilityQuery__
 *
 * To run a query within a React component, call `useCheckProductAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckProductAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckProductAvailabilityQuery({
 *   variables: {
 *      agencyId: // value for 'agencyId'
 *      productId: // value for 'productId'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      quantity: // value for 'quantity'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useCheckProductAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<CheckProductAvailabilityQuery, CheckProductAvailabilityQueryVariables> & ({ variables: CheckProductAvailabilityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckProductAvailabilityQuery, CheckProductAvailabilityQueryVariables>(CheckProductAvailabilityDocument, options);
      }
export function useCheckProductAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckProductAvailabilityQuery, CheckProductAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckProductAvailabilityQuery, CheckProductAvailabilityQueryVariables>(CheckProductAvailabilityDocument, options);
        }
export function useCheckProductAvailabilitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckProductAvailabilityQuery, CheckProductAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckProductAvailabilityQuery, CheckProductAvailabilityQueryVariables>(CheckProductAvailabilityDocument, options);
        }
export type CheckProductAvailabilityQueryHookResult = ReturnType<typeof useCheckProductAvailabilityQuery>;
export type CheckProductAvailabilityLazyQueryHookResult = ReturnType<typeof useCheckProductAvailabilityLazyQuery>;
export type CheckProductAvailabilitySuspenseQueryHookResult = ReturnType<typeof useCheckProductAvailabilitySuspenseQuery>;
export type CheckProductAvailabilityQueryResult = Apollo.QueryResult<CheckProductAvailabilityQuery, CheckProductAvailabilityQueryVariables>;