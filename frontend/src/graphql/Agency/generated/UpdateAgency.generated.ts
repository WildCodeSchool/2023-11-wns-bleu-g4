import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAgencyMutationVariables = Types.Exact<{
  data: Types.UpdateAgencyInput;
  agencyId: Types.Scalars['Float']['input'];
}>;


export type UpdateAgencyMutation = { __typename?: 'Mutation', updateAgency: { __typename?: 'Agency', id: number, name: string, address: string, postcode: string, city: string, country: string, phone: string, email: string } };


export const UpdateAgencyDocument = gql`
    mutation UpdateAgency($data: UpdateAgencyInput!, $agencyId: Float!) {
  updateAgency(data: $data, agencyId: $agencyId) {
    id
    name
    address
    postcode
    city
    country
    phone
    email
  }
}
    `;
export type UpdateAgencyMutationFn = Apollo.MutationFunction<UpdateAgencyMutation, UpdateAgencyMutationVariables>;

/**
 * __useUpdateAgencyMutation__
 *
 * To run a mutation, you first call `useUpdateAgencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAgencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAgencyMutation, { data, loading, error }] = useUpdateAgencyMutation({
 *   variables: {
 *      data: // value for 'data'
 *      agencyId: // value for 'agencyId'
 *   },
 * });
 */
export function useUpdateAgencyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAgencyMutation, UpdateAgencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAgencyMutation, UpdateAgencyMutationVariables>(UpdateAgencyDocument, options);
      }
export type UpdateAgencyMutationHookResult = ReturnType<typeof useUpdateAgencyMutation>;
export type UpdateAgencyMutationResult = Apollo.MutationResult<UpdateAgencyMutation>;
export type UpdateAgencyMutationOptions = Apollo.BaseMutationOptions<UpdateAgencyMutation, UpdateAgencyMutationVariables>;