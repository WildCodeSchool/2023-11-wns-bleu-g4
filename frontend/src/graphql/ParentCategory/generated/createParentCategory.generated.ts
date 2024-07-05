import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateParentCategoryMutationVariables = Types.Exact<{
  data: Types.NewParentCategoryInput;
}>;


export type CreateParentCategoryMutation = { __typename?: 'Mutation', createParentCategory: { __typename?: 'ParentCategory', name: string } };


export const CreateParentCategoryDocument = gql`
    mutation CreateParentCategory($data: NewParentCategoryInput!) {
  createParentCategory(data: $data) {
    name
  }
}
    `;
export type CreateParentCategoryMutationFn = Apollo.MutationFunction<CreateParentCategoryMutation, CreateParentCategoryMutationVariables>;

/**
 * __useCreateParentCategoryMutation__
 *
 * To run a mutation, you first call `useCreateParentCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateParentCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createParentCategoryMutation, { data, loading, error }] = useCreateParentCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateParentCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateParentCategoryMutation, CreateParentCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateParentCategoryMutation, CreateParentCategoryMutationVariables>(CreateParentCategoryDocument, options);
      }
export type CreateParentCategoryMutationHookResult = ReturnType<typeof useCreateParentCategoryMutation>;
export type CreateParentCategoryMutationResult = Apollo.MutationResult<CreateParentCategoryMutation>;
export type CreateParentCategoryMutationOptions = Apollo.BaseMutationOptions<CreateParentCategoryMutation, CreateParentCategoryMutationVariables>;