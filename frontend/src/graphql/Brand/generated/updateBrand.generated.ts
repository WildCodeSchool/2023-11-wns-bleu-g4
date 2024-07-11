import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBrandMutationVariables = Types.Exact<{
  data: Types.UpdateBrandInput;
  brandId: Types.Scalars['Int']['input'];
}>;


export type UpdateBrandMutation = { __typename?: 'Mutation', updateBrand: { __typename?: 'Brand', id: number, name: string, logo: string } };


export const UpdateBrandDocument = gql`
    mutation UpdateBrand($data: UpdateBrandInput!, $brandId: Int!) {
  updateBrand(data: $data, brandId: $brandId) {
    id
    name
    logo
  }
}
    `;
export type UpdateBrandMutationFn = Apollo.MutationFunction<UpdateBrandMutation, UpdateBrandMutationVariables>;

/**
 * __useUpdateBrandMutation__
 *
 * To run a mutation, you first call `useUpdateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBrandMutation, { data, loading, error }] = useUpdateBrandMutation({
 *   variables: {
 *      data: // value for 'data'
 *      brandId: // value for 'brandId'
 *   },
 * });
 */
export function useUpdateBrandMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBrandMutation, UpdateBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBrandMutation, UpdateBrandMutationVariables>(UpdateBrandDocument, options);
      }
export type UpdateBrandMutationHookResult = ReturnType<typeof useUpdateBrandMutation>;
export type UpdateBrandMutationResult = Apollo.MutationResult<UpdateBrandMutation>;
export type UpdateBrandMutationOptions = Apollo.BaseMutationOptions<UpdateBrandMutation, UpdateBrandMutationVariables>;