import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProductCharacteristicMutationVariables = Types.Exact<{
  data: Types.UpdateProductCharacteristicInput;
  updateProductCharacteristicId: Types.Scalars['Float']['input'];
}>;


export type UpdateProductCharacteristicMutation = { __typename?: 'Mutation', updateProductCharacteristic: { __typename?: 'ProductCharacteristic', name: string } };


export const UpdateProductCharacteristicDocument = gql`
    mutation UpdateProductCharacteristic($data: UpdateProductCharacteristicInput!, $updateProductCharacteristicId: Float!) {
  updateProductCharacteristic(data: $data, id: $updateProductCharacteristicId) {
    name
  }
}
    `;
export type UpdateProductCharacteristicMutationFn = Apollo.MutationFunction<UpdateProductCharacteristicMutation, UpdateProductCharacteristicMutationVariables>;

/**
 * __useUpdateProductCharacteristicMutation__
 *
 * To run a mutation, you first call `useUpdateProductCharacteristicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductCharacteristicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductCharacteristicMutation, { data, loading, error }] = useUpdateProductCharacteristicMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateProductCharacteristicId: // value for 'updateProductCharacteristicId'
 *   },
 * });
 */
export function useUpdateProductCharacteristicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductCharacteristicMutation, UpdateProductCharacteristicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductCharacteristicMutation, UpdateProductCharacteristicMutationVariables>(UpdateProductCharacteristicDocument, options);
      }
export type UpdateProductCharacteristicMutationHookResult = ReturnType<typeof useUpdateProductCharacteristicMutation>;
export type UpdateProductCharacteristicMutationResult = Apollo.MutationResult<UpdateProductCharacteristicMutation>;
export type UpdateProductCharacteristicMutationOptions = Apollo.BaseMutationOptions<UpdateProductCharacteristicMutation, UpdateProductCharacteristicMutationVariables>;