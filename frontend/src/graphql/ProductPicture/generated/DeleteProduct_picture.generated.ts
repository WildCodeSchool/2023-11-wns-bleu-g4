import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteProduct_PictureMutationVariables = Types.Exact<{
  deleteProductPictureId: Types.Scalars['Int']['input'];
}>;


export type DeleteProduct_PictureMutation = { __typename?: 'Mutation', deleteProduct_picture: boolean };


export const DeleteProduct_PictureDocument = gql`
    mutation DeleteProduct_picture($deleteProductPictureId: Int!) {
  deleteProduct_picture(id: $deleteProductPictureId)
}
    `;
export type DeleteProduct_PictureMutationFn = Apollo.MutationFunction<DeleteProduct_PictureMutation, DeleteProduct_PictureMutationVariables>;

/**
 * __useDeleteProduct_PictureMutation__
 *
 * To run a mutation, you first call `useDeleteProduct_PictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProduct_PictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductPictureMutation, { data, loading, error }] = useDeleteProduct_PictureMutation({
 *   variables: {
 *      deleteProductPictureId: // value for 'deleteProductPictureId'
 *   },
 * });
 */
export function useDeleteProduct_PictureMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProduct_PictureMutation, DeleteProduct_PictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProduct_PictureMutation, DeleteProduct_PictureMutationVariables>(DeleteProduct_PictureDocument, options);
      }
export type DeleteProduct_PictureMutationHookResult = ReturnType<typeof useDeleteProduct_PictureMutation>;
export type DeleteProduct_PictureMutationResult = Apollo.MutationResult<DeleteProduct_PictureMutation>;
export type DeleteProduct_PictureMutationOptions = Apollo.BaseMutationOptions<DeleteProduct_PictureMutation, DeleteProduct_PictureMutationVariables>;