import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAgencyMutationVariables = Types.Exact<{
  data: Types.NewAgencyInput;
}>;


export type CreateAgencyMutation = { __typename?: 'Mutation', createAgency: { __typename?: 'Agency', id: number, name: string, address: string, postcode: string, city: string, country: string, phone: string, email: string, bookings: Array<{ __typename?: 'Booking', id: number }>, productCodes: Array<{ __typename?: 'ProductCode', id: number }> } };


export const CreateAgencyDocument = gql`
    mutation CreateAgency($data: NewAgencyInput!) {
  createAgency(data: $data) {
    id
    name
    address
    postcode
    city
    country
    phone
    email
    bookings {
      id
    }
    productCodes {
      id
    }
  }
}
    `;
export type CreateAgencyMutationFn = Apollo.MutationFunction<CreateAgencyMutation, CreateAgencyMutationVariables>;

/**
 * __useCreateAgencyMutation__
 *
 * To run a mutation, you first call `useCreateAgencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAgencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAgencyMutation, { data, loading, error }] = useCreateAgencyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAgencyMutation(baseOptions?: Apollo.MutationHookOptions<CreateAgencyMutation, CreateAgencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAgencyMutation, CreateAgencyMutationVariables>(CreateAgencyDocument, options);
      }
export type CreateAgencyMutationHookResult = ReturnType<typeof useCreateAgencyMutation>;
export type CreateAgencyMutationResult = Apollo.MutationResult<CreateAgencyMutation>;
export type CreateAgencyMutationOptions = Apollo.BaseMutationOptions<CreateAgencyMutation, CreateAgencyMutationVariables>;