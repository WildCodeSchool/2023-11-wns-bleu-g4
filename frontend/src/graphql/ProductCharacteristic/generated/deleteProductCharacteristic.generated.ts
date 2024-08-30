import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteProductCharacteristicMutationVariables = Types.Exact<{
  productCharacteristicId: Types.Scalars['Int']['input'];
}>;


export type DeleteProductCharacteristicMutation = { __typename?: 'Mutation', deleteProductCharacteristic: string };


export const DeleteProductCharacteristicDocument = gql`
    mutation DeleteProductCharacteristic($productCharacteristicId: Int!) {
  deleteProductCharacteristic(productCharacteristicId: $productCharacteristicId)
}
    `;
export type DeleteProductCharacteristicMutationFn = Apollo.MutationFunction<DeleteProductCharacteristicMutation, DeleteProductCharacteristicMutationVariables>;

/**
 * __useDeleteProductCharacteristicMutation__
 *
 * To run a mutation, you first call `useDeleteProductCharacteristicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductCharacteristicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductCharacteristicMutation, { data, loading, error }] = useDeleteProductCharacteristicMutation({
 *   variables: {
 *      productCharacteristicId: // value for 'productCharacteristicId'
 *   },
 * });
 */
export function useDeleteProductCharacteristicMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductCharacteristicMutation, DeleteProductCharacteristicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductCharacteristicMutation, DeleteProductCharacteristicMutationVariables>(DeleteProductCharacteristicDocument, options);
      }
export type DeleteProductCharacteristicMutationHookResult = ReturnType<typeof useDeleteProductCharacteristicMutation>;
export type DeleteProductCharacteristicMutationResult = Apollo.MutationResult<DeleteProductCharacteristicMutation>;
export type DeleteProductCharacteristicMutationOptions = Apollo.BaseMutationOptions<DeleteProductCharacteristicMutation, DeleteProductCharacteristicMutationVariables>;