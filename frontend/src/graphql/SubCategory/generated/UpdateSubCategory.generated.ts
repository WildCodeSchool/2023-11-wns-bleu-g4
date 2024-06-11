import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSubCategoryMutationVariables = Types.Exact<{
  data: Types.UpdateSubCategoryInput;
  subCategoryId: Types.Scalars['Float'];
}>;


export type UpdateSubCategoryMutation = { __typename?: 'Mutation', updateSubCategory: { __typename?: 'SubCategory', id: number, name: string, thumbnail: string } };


export const UpdateSubCategoryDocument = gql`
    mutation UpdateSubCategory($data: UpdateSubCategoryInput!, $subCategoryId: Float!) {
  updateSubCategory(data: $data, subCategoryId: $subCategoryId) {
    id
    name
    thumbnail
  }
}
    `;
export type UpdateSubCategoryMutationFn = Apollo.MutationFunction<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>;

/**
 * __useUpdateSubCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubCategoryMutation, { data, loading, error }] = useUpdateSubCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *      subCategoryId: // value for 'subCategoryId'
 *   },
 * });
 */
export function useUpdateSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>(UpdateSubCategoryDocument, options);
      }
export type UpdateSubCategoryMutationHookResult = ReturnType<typeof useUpdateSubCategoryMutation>;
export type UpdateSubCategoryMutationResult = Apollo.MutationResult<UpdateSubCategoryMutation>;
export type UpdateSubCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>;