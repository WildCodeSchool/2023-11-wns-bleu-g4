import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdatePasswordMutationVariables = Types.Exact<{
  newPassword: Types.Scalars['String']['input'];
  currentPassword: Types.Scalars['String']['input'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'User', id: number, firstname: string, name: string } };


export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($newPassword: String!, $currentPassword: String!) {
  updatePassword(newPassword: $newPassword, currentPassword: $currentPassword) {
    id
    firstname
    name
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      currentPassword: // value for 'currentPassword'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;