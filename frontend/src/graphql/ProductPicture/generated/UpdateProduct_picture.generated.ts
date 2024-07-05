import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProduct_PictureMutationVariables = Types.Exact<{
  data: Types.UpdateProduct_PictureInput;
  updateProductPictureId: Types.Scalars['Int']['input'];
}>;


export type UpdateProduct_PictureMutation = { __typename?: 'Mutation', updateProduct_picture: { __typename?: 'Product_picture', id: number, thumbnail: string, alt: string } };


export const UpdateProduct_PictureDocument = gql`
    mutation UpdateProduct_picture($data: UpdateProduct_pictureInput!, $updateProductPictureId: Int!) {
  updateProduct_picture(data: $data, id: $updateProductPictureId) {
    id
    thumbnail
    alt
  }
}
    `;
export type UpdateProduct_PictureMutationFn = Apollo.MutationFunction<UpdateProduct_PictureMutation, UpdateProduct_PictureMutationVariables>;

/**
 * __useUpdateProduct_PictureMutation__
 *
 * To run a mutation, you first call `useUpdateProduct_PictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProduct_PictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductPictureMutation, { data, loading, error }] = useUpdateProduct_PictureMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateProductPictureId: // value for 'updateProductPictureId'
 *   },
 * });
 */
export function useUpdateProduct_PictureMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProduct_PictureMutation, UpdateProduct_PictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProduct_PictureMutation, UpdateProduct_PictureMutationVariables>(UpdateProduct_PictureDocument, options);
      }
export type UpdateProduct_PictureMutationHookResult = ReturnType<typeof useUpdateProduct_PictureMutation>;
export type UpdateProduct_PictureMutationResult = Apollo.MutationResult<UpdateProduct_PictureMutation>;
export type UpdateProduct_PictureMutationOptions = Apollo.BaseMutationOptions<UpdateProduct_PictureMutation, UpdateProduct_PictureMutationVariables>;