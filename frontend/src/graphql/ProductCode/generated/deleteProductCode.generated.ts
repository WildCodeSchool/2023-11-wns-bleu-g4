import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteProductCodeMutationVariables = Types.Exact<{
  productCodeId: Types.Scalars['Int']['input'];
}>;


export type DeleteProductCodeMutation = { __typename?: 'Mutation', deleteProductCode: boolean };


export const DeleteProductCodeDocument = gql`
    mutation DeleteProductCode($productCodeId: Int!) {
  deleteProductCode(productCodeId: $productCodeId)
}
    `;
export type DeleteProductCodeMutationFn = Apollo.MutationFunction<DeleteProductCodeMutation, DeleteProductCodeMutationVariables>;

/**
 * __useDeleteProductCodeMutation__
 *
 * To run a mutation, you first call `useDeleteProductCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductCodeMutation, { data, loading, error }] = useDeleteProductCodeMutation({
 *   variables: {
 *      productCodeId: // value for 'productCodeId'
 *   },
 * });
 */
export function useDeleteProductCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductCodeMutation, DeleteProductCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductCodeMutation, DeleteProductCodeMutationVariables>(DeleteProductCodeDocument, options);
      }
export type DeleteProductCodeMutationHookResult = ReturnType<typeof useDeleteProductCodeMutation>;
export type DeleteProductCodeMutationResult = Apollo.MutationResult<DeleteProductCodeMutation>;
export type DeleteProductCodeMutationOptions = Apollo.BaseMutationOptions<DeleteProductCodeMutation, DeleteProductCodeMutationVariables>;