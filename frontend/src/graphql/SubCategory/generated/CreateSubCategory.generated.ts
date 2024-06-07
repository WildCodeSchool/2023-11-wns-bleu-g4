import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateSubCategoryMutationVariables = Types.Exact<{
  data: Types.NewSubCategoryInput;
}>;


export type CreateSubCategoryMutation = { __typename?: 'Mutation', createSubCategory: { __typename?: 'SubCategory', id: number, name: string, thumbnail: string } };


export const CreateSubCategoryDocument = gql`
    mutation CreateSubCategory($data: NewSubCategoryInput!) {
  createSubCategory(data: $data) {
    id
    name
    thumbnail
  }
}
    `;
export type CreateSubCategoryMutationFn = Apollo.MutationFunction<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>;

/**
 * __useCreateSubCategoryMutation__
 *
 * To run a mutation, you first call `useCreateSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubCategoryMutation, { data, loading, error }] = useCreateSubCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>(CreateSubCategoryDocument, options);
      }
export type CreateSubCategoryMutationHookResult = ReturnType<typeof useCreateSubCategoryMutation>;
export type CreateSubCategoryMutationResult = Apollo.MutationResult<CreateSubCategoryMutation>;
export type CreateSubCategoryMutationOptions = Apollo.BaseMutationOptions<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>;