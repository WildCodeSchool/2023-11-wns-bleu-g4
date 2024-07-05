import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProductCharacteristicMutationVariables = Types.Exact<{
  data: Types.NewProductCharacteristicInput;
}>;


export type CreateProductCharacteristicMutation = { __typename?: 'Mutation', createProductCharacteristic: { __typename?: 'ProductCharacteristic', name: string } };


export const CreateProductCharacteristicDocument = gql`
    mutation CreateProductCharacteristic($data: NewProductCharacteristicInput!) {
  createProductCharacteristic(data: $data) {
    name
  }
}
    `;
export type CreateProductCharacteristicMutationFn = Apollo.MutationFunction<CreateProductCharacteristicMutation, CreateProductCharacteristicMutationVariables>;

/**
 * __useCreateProductCharacteristicMutation__
 *
 * To run a mutation, you first call `useCreateProductCharacteristicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductCharacteristicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductCharacteristicMutation, { data, loading, error }] = useCreateProductCharacteristicMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductCharacteristicMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductCharacteristicMutation, CreateProductCharacteristicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductCharacteristicMutation, CreateProductCharacteristicMutationVariables>(CreateProductCharacteristicDocument, options);
      }
export type CreateProductCharacteristicMutationHookResult = ReturnType<typeof useCreateProductCharacteristicMutation>;
export type CreateProductCharacteristicMutationResult = Apollo.MutationResult<CreateProductCharacteristicMutation>;
export type CreateProductCharacteristicMutationOptions = Apollo.BaseMutationOptions<CreateProductCharacteristicMutation, CreateProductCharacteristicMutationVariables>;