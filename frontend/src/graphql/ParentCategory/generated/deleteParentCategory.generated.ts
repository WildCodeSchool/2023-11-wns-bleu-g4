import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteParentCategoryMutationVariables = Types.Exact<{
  parentCategoryId: Types.Scalars['Float']['input'];
}>;


export type DeleteParentCategoryMutation = { __typename?: 'Mutation', deleteParentCategory: string };


export const DeleteParentCategoryDocument = gql`
    mutation DeleteParentCategory($parentCategoryId: Float!) {
  deleteParentCategory(parentCategoryId: $parentCategoryId)
}
    `;
export type DeleteParentCategoryMutationFn = Apollo.MutationFunction<DeleteParentCategoryMutation, DeleteParentCategoryMutationVariables>;

/**
 * __useDeleteParentCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteParentCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteParentCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteParentCategoryMutation, { data, loading, error }] = useDeleteParentCategoryMutation({
 *   variables: {
 *      parentCategoryId: // value for 'parentCategoryId'
 *   },
 * });
 */
export function useDeleteParentCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteParentCategoryMutation, DeleteParentCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteParentCategoryMutation, DeleteParentCategoryMutationVariables>(DeleteParentCategoryDocument, options);
      }
export type DeleteParentCategoryMutationHookResult = ReturnType<typeof useDeleteParentCategoryMutation>;
export type DeleteParentCategoryMutationResult = Apollo.MutationResult<DeleteParentCategoryMutation>;
export type DeleteParentCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteParentCategoryMutation, DeleteParentCategoryMutationVariables>;