import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Agency = {
  __typename?: 'Agency';
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phone: Scalars['String'];
  postcode: Scalars['String'];
  productCodes: Array<Product_Code>;
};

export type Category = {
  __typename?: "Category";
  id: Scalars["Int"];
  name: Scalars["String"];
  products: Array<Product>;
  subCategories: Array<SubCategory>;
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: Scalars['String'];
  createCategory: Category;
  createProduct: Product;
  createReview: Review;
  createSubCategory: SubCategory;
  createUser: User;
  deleteCategory: Scalars['String'];
  deleteProduct: Scalars['String'];
  deleteReview: Scalars['String'];
  deleteSubCategory: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  updateCategory: Category;
  updateProduct: Product;
  updateProfile: User;
  updateReview: Review;
  updateSubCategory: SubCategory;
};

export type MutationConfirmEmailArgs = {
  token: Scalars["String"];
};


export type MutationCreateCategoryArgs = {
  data: NewCategoryInput;
};

export type MutationCreateProductArgs = {
  data: NewProductInput;
};

export type MutationCreateReviewArgs = {
  data: NewReviewInput;
};

export type MutationCreateSubCategoryArgs = {
  data: NewSubCategoryInput;
};

export type MutationCreateUserArgs = {
  data: NewUserInput;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars["Float"];
};

export type MutationDeleteProductArgs = {
  productId: Scalars["Float"];
};

export type MutationDeleteReviewArgs = {
  reviewId: Scalars["Float"];
};

export type MutationDeleteSubCategoryArgs = {
  subCategoryId: Scalars["Float"];
};

export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars["Float"];
  data: UpdateCategoryInput;
};

export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
  productId: Scalars["Float"];
};

export type MutationUpdateProfileArgs = {
  data: UpdateUserInput;
};

export type MutationUpdateReviewArgs = {
  data: UpdateReviewInput;
  reviewId: Scalars["Float"];
};

export type MutationUpdateSubCategoryArgs = {
  data: UpdateSubCategoryInput;
  subCategoryId: Scalars["Float"];
};

export type NewAgencyInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  postcode: Scalars['String'];
};

export type NewCategoryInput = {
  name: Scalars["String"];
};

export type NewProductInput = {
  brand: Scalars["String"];
  categories: Array<ObjectId>;
  description: Scalars["String"];
  name: Scalars["String"];
  price: Scalars["Float"];
  reviews?: InputMaybe<Array<ObjectId>>;
  thumbnail: Scalars["String"];
};

export type NewReviewInput = {
  comment: Scalars["String"];
  productId: Scalars["Int"];
  rate: Scalars["Int"];
  userId: Scalars["Int"];
};

export type NewSubCategoryInput = {
  category: ObjectId;
  name: Scalars["String"];
  thumbnail: Scalars["String"];
};

export type NewUserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type ObjectId = {
  id: Scalars["Int"];
};

export type Product = {
  __typename?: "Product";
  brand: Scalars["String"];
  categories: Array<Category>;
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  reviews: Array<Review>;
  thumbnail: Scalars["String"];
};

export type Product_Code = {
  __typename?: 'Product_code';
  agency?: Maybe<Agency>;
  id: Scalars['Int'];
  product?: Maybe<Product>;
  status: Status;
};

export type Query = {
  __typename?: 'Query';
  getAllCategories: Array<Category>;
  getAllProduct_codes: Array<Product_Code>;
  getAllProducts: Array<Product>;
  getAllSubCategories: Array<SubCategory>;
  getCategoryById: Category;
  getProductById: Product;
  getProductCodesByStatus: Array<Product_Code>;
  getSubCategoryById: SubCategory;
  profile: User;
};


export type QueryGetAllCategoriesArgs = {
  name?: InputMaybe<Scalars["String"]>;
  productId?: InputMaybe<Scalars["Int"]>;
  subCategoryId?: InputMaybe<Scalars["Int"]>;
};

export type QueryGetAllProductsArgs = {
  categoryId?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryGetAllSubCategoriesArgs = {
  categoryId?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryGetCategoryByIdArgs = {
  categoryId: Scalars["Int"];
};

export type QueryGetProductByIdArgs = {
  productId: Scalars["Int"];
};


export type QueryGetSubCategoryByIdArgs = {
  subCategoryId: Scalars["Int"];
};

export type Review = {
  __typename?: "Review";
  comment: Scalars["String"];
  id: Scalars["Int"];
  product?: Maybe<Product>;
  rate: Scalars["Int"];
  user?: Maybe<User>;
};

/** Check if the product is available or booked. */
export enum Status {
  Available = 'AVAILABLE',
  Booked = 'BOOKED'
}

export type SubCategory = {
  __typename?: "SubCategory";
  id: Scalars["Int"];
  name: Scalars["String"];
  thumbnail: Scalars["String"];
};

export type UpdateAgencyInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
  name?: InputMaybe<Scalars["String"]>;
};

export type UpdateProductInput = {
  brand?: InputMaybe<Scalars["String"]>;
  categories: Array<ObjectId>;
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Float"]>;
  reviews?: InputMaybe<Array<ObjectId>>;
  thumbnail?: InputMaybe<Scalars["String"]>;
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars["String"]>;
  rate?: InputMaybe<Scalars["Int"]>;
};

export type UpdateSubCategoryInput = {
  category: ObjectId;
  name?: InputMaybe<Scalars["String"]>;
  thumbnail?: InputMaybe<Scalars["String"]>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars["String"]>;
  avatar?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  firstname?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  postcode?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  address: Scalars["String"];
  avatar: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  email: Scalars["String"];
  firstname: Scalars["String"];
  id: Scalars["Float"];
  name: Scalars["String"];
  phone: Scalars["String"];
  postcode: Scalars["String"];
  reviews: Array<Review>;
  role: Scalars["String"];
};

export type CreateUserMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string, name: string, firstname: string, address: string, postcode: string, city: string, country: string, phone: string, avatar: string } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };


export const CreateUserDocument = gql`
    mutation CreateUser($data: NewUserInput!) {
  createUser(data: $data) {
    id
    email
    name
    firstname
    address
    postcode
    city
    country
    phone
    avatar
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;