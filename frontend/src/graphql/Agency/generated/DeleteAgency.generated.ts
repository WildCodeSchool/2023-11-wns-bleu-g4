import * as Types from "../../generated/schema";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type DeleteAgencyMutationVariables = Types.Exact<{
  agencyId: Types.Scalars["Float"]["input"];
}>;

export type DeleteAgencyMutation = { __typename?: "Mutation"; deleteAgency: string };

export const DeleteAgencyDocument = gql`
  mutation DeleteAgency($agencyId: Float!) {
    deleteAgency(agencyId: $agencyId)
  }
`;
export type DeleteAgencyMutationFn = Apollo.MutationFunction<DeleteAgencyMutation, DeleteAgencyMutationVariables>;

/**
 * __useDeleteAgencyMutation__
 *
 * To run a mutation, you first call `useDeleteAgencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAgencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAgencyMutation, { data, loading, error }] = useDeleteAgencyMutation({
 *   variables: {
 *      agencyId: // value for 'agencyId'
 *   },
 * });
 */
export function useDeleteAgencyMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteAgencyMutation, DeleteAgencyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteAgencyMutation, DeleteAgencyMutationVariables>(DeleteAgencyDocument, options);
}
export type DeleteAgencyMutationHookResult = ReturnType<typeof useDeleteAgencyMutation>;
export type DeleteAgencyMutationResult = Apollo.MutationResult<DeleteAgencyMutation>;
export type DeleteAgencyMutationOptions = Apollo.BaseMutationOptions<
  DeleteAgencyMutation,
  DeleteAgencyMutationVariables
>;
