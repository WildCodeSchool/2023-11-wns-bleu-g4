import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProductCodeMutationVariables = Types.Exact<{
  quantity: Types.Scalars['Int']['input'];
  data: Types.NewProductCodeInput;
}>;


export type CreateProductCodeMutation = { __typename?: 'Mutation', createProductCode: Array<{ __typename?: 'ProductCode', id: number, status: Types.Status, isSizeable: boolean, size?: string | null, product?: { __typename?: 'Product', id: number } | null, agency?: { __typename?: 'Agency', id: number } | null }> };


export const CreateProductCodeDocument = gql`
    mutation CreateProductCode($quantity: Int!, $data: NewProductCodeInput!) {
  createProductCode(quantity: $quantity, data: $data) {
    id
    status
    isSizeable
    size
    product {
      id
    }
    agency {
      id
    }
  }
}
    `;
export type CreateProductCodeMutationFn = Apollo.MutationFunction<CreateProductCodeMutation, CreateProductCodeMutationVariables>;

/**
 * __useCreateProductCodeMutation__
 *
 * To run a mutation, you first call `useCreateProductCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductCodeMutation, { data, loading, error }] = useCreateProductCodeMutation({
 *   variables: {
 *      quantity: // value for 'quantity'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductCodeMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductCodeMutation, CreateProductCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductCodeMutation, CreateProductCodeMutationVariables>(CreateProductCodeDocument, options);
      }
export type CreateProductCodeMutationHookResult = ReturnType<typeof useCreateProductCodeMutation>;
export type CreateProductCodeMutationResult = Apollo.MutationResult<CreateProductCodeMutation>;
export type CreateProductCodeMutationOptions = Apollo.BaseMutationOptions<CreateProductCodeMutation, CreateProductCodeMutationVariables>;