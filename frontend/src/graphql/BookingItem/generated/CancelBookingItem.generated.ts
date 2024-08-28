import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelBookingItemsMutationVariables = Types.Exact<{
  data: Types.UpdateBookingItemInput;
}>;


export type CancelBookingItemsMutation = { __typename?: 'Mutation', cancelBookingItems: string };


export const CancelBookingItemsDocument = gql`
    mutation CancelBookingItems($data: UpdateBookingItemInput!) {
  cancelBookingItems(data: $data)
}
    `;
export type CancelBookingItemsMutationFn = Apollo.MutationFunction<CancelBookingItemsMutation, CancelBookingItemsMutationVariables>;

/**
 * __useCancelBookingItemsMutation__
 *
 * To run a mutation, you first call `useCancelBookingItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelBookingItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelBookingItemsMutation, { data, loading, error }] = useCancelBookingItemsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCancelBookingItemsMutation(baseOptions?: Apollo.MutationHookOptions<CancelBookingItemsMutation, CancelBookingItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelBookingItemsMutation, CancelBookingItemsMutationVariables>(CancelBookingItemsDocument, options);
      }
export type CancelBookingItemsMutationHookResult = ReturnType<typeof useCancelBookingItemsMutation>;
export type CancelBookingItemsMutationResult = Apollo.MutationResult<CancelBookingItemsMutation>;
export type CancelBookingItemsMutationOptions = Apollo.BaseMutationOptions<CancelBookingItemsMutation, CancelBookingItemsMutationVariables>;