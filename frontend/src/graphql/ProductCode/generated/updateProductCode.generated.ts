import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProductCodeStatusMutationVariables = Types.Exact<{
  status: Types.Status;
  productCodeId: Types.Scalars['Int']['input'];
}>;


export type UpdateProductCodeStatusMutation = { __typename?: 'Mutation', updateProductCodeStatus: { __typename?: 'ProductCode', status: Types.Status } };


export const UpdateProductCodeStatusDocument = gql`
    mutation UpdateProductCodeStatus($status: Status!, $productCodeId: Int!) {
  updateProductCodeStatus(status: $status, productCodeId: $productCodeId) {
    status
  }
}
    `;
export type UpdateProductCodeStatusMutationFn = Apollo.MutationFunction<UpdateProductCodeStatusMutation, UpdateProductCodeStatusMutationVariables>;

/**
 * __useUpdateProductCodeStatusMutation__
 *
 * To run a mutation, you first call `useUpdateProductCodeStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductCodeStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductCodeStatusMutation, { data, loading, error }] = useUpdateProductCodeStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *      productCodeId: // value for 'productCodeId'
 *   },
 * });
 */
export function useUpdateProductCodeStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductCodeStatusMutation, UpdateProductCodeStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductCodeStatusMutation, UpdateProductCodeStatusMutationVariables>(UpdateProductCodeStatusDocument, options);
      }
export type UpdateProductCodeStatusMutationHookResult = ReturnType<typeof useUpdateProductCodeStatusMutation>;
export type UpdateProductCodeStatusMutationResult = Apollo.MutationResult<UpdateProductCodeStatusMutation>;
export type UpdateProductCodeStatusMutationOptions = Apollo.BaseMutationOptions<UpdateProductCodeStatusMutation, UpdateProductCodeStatusMutationVariables>;