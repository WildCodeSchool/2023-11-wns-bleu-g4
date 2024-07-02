import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBookingMutationVariables = Types.Exact<{
  data: Types.UpdateBookingInput;
  bookingId: Types.Scalars['Float']['input'];
}>;


export type UpdateBookingMutation = { __typename?: 'Mutation', updateBooking: { __typename?: 'Booking', id: number, status: Types.StatusBooking, bookingDate: any, startDate: any, endDate: any, agency: { __typename?: 'Agency', id: number }, user: { __typename?: 'User', id: number } } };


export const UpdateBookingDocument = gql`
    mutation UpdateBooking($data: UpdateBookingInput!, $bookingId: Float!) {
  updateBooking(data: $data, bookingId: $bookingId) {
    id
    status
    bookingDate
    startDate
    endDate
    agency {
      id
    }
    user {
      id
    }
  }
}
    `;
export type UpdateBookingMutationFn = Apollo.MutationFunction<UpdateBookingMutation, UpdateBookingMutationVariables>;

/**
 * __useUpdateBookingMutation__
 *
 * To run a mutation, you first call `useUpdateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookingMutation, { data, loading, error }] = useUpdateBookingMutation({
 *   variables: {
 *      data: // value for 'data'
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useUpdateBookingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookingMutation, UpdateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookingMutation, UpdateBookingMutationVariables>(UpdateBookingDocument, options);
      }
export type UpdateBookingMutationHookResult = ReturnType<typeof useUpdateBookingMutation>;
export type UpdateBookingMutationResult = Apollo.MutationResult<UpdateBookingMutation>;
export type UpdateBookingMutationOptions = Apollo.BaseMutationOptions<UpdateBookingMutation, UpdateBookingMutationVariables>;