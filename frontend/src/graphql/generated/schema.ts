import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: Scalars['String'];
  createUser: User;
  login: Scalars['String'];
  logout: Scalars['String'];
  updateProfile: User;
};

export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};

export type MutationCreateUserArgs = {
  data: NewUserInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationUpdateProfileArgs = {
  data: UpdateUserInput;
};

export type NewUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  profile: User;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  avatar: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  phone: Scalars['String'];
  postcode: Scalars['String'];
  role: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation'; login: string };

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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
