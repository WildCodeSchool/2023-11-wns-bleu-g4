import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateReviewMutationVariables = Types.Exact<{
  data: Types.UpdateReviewInput;
  reviewId: Types.Scalars['Float'];
}>;


export type UpdateReviewMutation = { __typename?: 'Mutation', updateReview: { __typename?: 'Review', id: number, rate: number, comment: string } };


export const UpdateReviewDocument = gql`
    mutation UpdateReview($data: UpdateReviewInput!, $reviewId: Float!) {
  updateReview(data: $data, reviewId: $reviewId) {
    id
    rate
    comment
  }
}
    `;
export type UpdateReviewMutationFn = Apollo.MutationFunction<UpdateReviewMutation, UpdateReviewMutationVariables>;

/**
 * __useUpdateReviewMutation__
 *
 * To run a mutation, you first call `useUpdateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReviewMutation, { data, loading, error }] = useUpdateReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useUpdateReviewMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReviewMutation, UpdateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReviewMutation, UpdateReviewMutationVariables>(UpdateReviewDocument, options);
      }
export type UpdateReviewMutationHookResult = ReturnType<typeof useUpdateReviewMutation>;
export type UpdateReviewMutationResult = Apollo.MutationResult<UpdateReviewMutation>;
export type UpdateReviewMutationOptions = Apollo.BaseMutationOptions<UpdateReviewMutation, UpdateReviewMutationVariables>;