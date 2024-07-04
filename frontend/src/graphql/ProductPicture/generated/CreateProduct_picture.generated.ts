import * as Types from "../../generated/schema";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CreateProduct_PictureMutationVariables = Types.Exact<{
  data: Types.NewProduct_PictureInput;
}>;

export type CreateProduct_PictureMutation = {
  __typename?: "Mutation";
  createProduct_picture: {
    __typename?: "Product_picture";
    thumbnail: string;
    alt: string;
    product: { __typename?: "Product"; id: number };
  };
};

export const CreateProduct_PictureDocument = gql`
  mutation CreateProduct_picture($data: NewProduct_pictureInput!) {
    createProduct_picture(data: $data) {
      thumbnail
      alt
      product {
        id
      }
    }
  }
`;
export type CreateProduct_PictureMutationFn = Apollo.MutationFunction<
  CreateProduct_PictureMutation,
  CreateProduct_PictureMutationVariables
>;

/**
 * __useCreateProduct_PictureMutation__
 *
 * To run a mutation, you first call `useCreateProduct_PictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProduct_PictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductPictureMutation, { data, loading, error }] = useCreateProduct_PictureMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProduct_PictureMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProduct_PictureMutation, CreateProduct_PictureMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateProduct_PictureMutation, CreateProduct_PictureMutationVariables>(
    CreateProduct_PictureDocument,
    options,
  );
}
export type CreateProduct_PictureMutationHookResult = ReturnType<typeof useCreateProduct_PictureMutation>;
export type CreateProduct_PictureMutationResult = Apollo.MutationResult<CreateProduct_PictureMutation>;
export type CreateProduct_PictureMutationOptions = Apollo.BaseMutationOptions<
  CreateProduct_PictureMutation,
  CreateProduct_PictureMutationVariables
>;
