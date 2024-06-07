import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateBookingMutationVariables = Types.Exact<{
  data: Types.NewBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: number, status: Types.StatusBooking, invoice: string, bookingDate: any, startDate: any, endDate: any } };


export const CreateBookingDocument = gql`
    mutation CreateBooking($data: NewBookingInput!) {
  createBooking(data: $data) {
    id
    status
    invoice
    bookingDate
    startDate
    endDate
  }
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;