import * as Types from "../../generated/schema";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type UpdateParentCategoryMutationVariables = Types.Exact<{
  data: Types.UpdateParentCategoryInput;
  parentCategoryId: Types.Scalars["Float"]["input"];
}>;

export type UpdateParentCategoryMutation = {
  __typename?: "Mutation";
  updateParentCategory: { __typename?: "ParentCategory"; id: number; name: string };
};

export const UpdateParentCategoryDocument = gql`
  mutation UpdateParentCategory($data: UpdateParentCategoryInput!, $parentCategoryId: Float!) {
    updateParentCategory(data: $data, parentCategoryId: $parentCategoryId) {
      id
      name
    }
  }
`;
export type UpdateParentCategoryMutationFn = Apollo.MutationFunction<
  UpdateParentCategoryMutation,
  UpdateParentCategoryMutationVariables
>;

/**
 * __useUpdateParentCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateParentCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateParentCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateParentCategoryMutation, { data, loading, error }] = useUpdateParentCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *      parentCategoryId: // value for 'parentCategoryId'
 *   },
 * });
 */
export function useUpdateParentCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateParentCategoryMutation, UpdateParentCategoryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateParentCategoryMutation, UpdateParentCategoryMutationVariables>(
    UpdateParentCategoryDocument,
    options,
  );
}
export type UpdateParentCategoryMutationHookResult = ReturnType<typeof useUpdateParentCategoryMutation>;
export type UpdateParentCategoryMutationResult = Apollo.MutationResult<UpdateParentCategoryMutation>;
export type UpdateParentCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateParentCategoryMutation,
  UpdateParentCategoryMutationVariables
>;
