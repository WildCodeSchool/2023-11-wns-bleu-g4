export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Agency = {
  __typename?: 'Agency';
  address: Scalars['String']['output'];
  bookings: Array<Booking>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  postcode: Scalars['String']['output'];
  productCodes: Array<ProductCode>;
};

export type AgencyId = {
  id: Scalars['Int']['input'];
};

export type Booking = {
  __typename?: 'Booking';
  agency: Agency;
  bookingDate: Scalars['DateTimeISO']['output'];
  bookingItem: Array<BookingItem>;
  endDate: Scalars['DateTimeISO']['output'];
  id: Scalars['Int']['output'];
  invoice: Scalars['String']['output'];
  startDate: Scalars['DateTimeISO']['output'];
  status: StatusBooking;
  user: User;
};

export type BookingId = {
  id: Scalars['Int']['input'];
};

export type BookingItem = {
  __typename?: 'BookingItem';
  booking: Booking;
  endDate: Scalars['DateTimeISO']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  productCode: ProductCode;
  startDate: Scalars['DateTimeISO']['output'];
  status: BookingItemStatus;
};

/** Check bookingItem's status. */
export enum BookingItemStatus {
  Broken = 'BROKEN',
  Canceled = 'CANCELED',
  Lost = 'LOST',
  Rented = 'RENTED',
  Returned = 'RETURNED'
}

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['Int']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  product: Array<Product>;
};

export type BrandId = {
  id: Scalars['Int']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  parentCategory: ParentCategory;
  products: Array<Product>;
  thumbnail: Scalars['String']['output'];
};

export type CategoryId = {
  id: Scalars['Int']['input'];
};

export type CharacteristicId = {
  id: Scalars['Int']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelBooking: Scalars['String']['output'];
  confirmEmail: Scalars['String']['output'];
  createAgency: Agency;
  createBooking: Booking;
  createBookingItem: BookingItem;
  createBrand: Brand;
  createCategory: Category;
  createParentCategory: ParentCategory;
  createProduct: Product;
  createProductCharacteristic: ProductCharacteristic;
  createProduct_picture: Product_Picture;
  createReview: Review;
  createUser: User;
  deleteAgency: Scalars['String']['output'];
  deleteBookingItem: Scalars['String']['output'];
  deleteBrand: Scalars['Boolean']['output'];
  deleteCategory: Scalars['String']['output'];
  deleteParentCategory: Scalars['String']['output'];
  deleteProduct: Scalars['String']['output'];
  deleteProduct_picture: Scalars['Boolean']['output'];
  deleteReview: Scalars['String']['output'];
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  updateAgency: Agency;
  updateBooking: Booking;
  updateBookingItem: BookingItem;
  updateBrand: Brand;
  updateCategory: Category;
  updateParentCategory: ParentCategory;
  updateProduct: Product;
  updateProductCharacteristic: ProductCharacteristic;
  updateProduct_picture: Product_Picture;
  updateProfile: User;
  updateReview: Review;
};


export type MutationCancelBookingArgs = {
  bookingId: Scalars['Float']['input'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateAgencyArgs = {
  data: NewAgencyInput;
};


export type MutationCreateBookingArgs = {
  data: NewBookingInput;
};


export type MutationCreateBookingItemArgs = {
  data: NewBookingItemInput;
};


export type MutationCreateBrandArgs = {
  data: NewBrandInput;
};


export type MutationCreateCategoryArgs = {
  data: NewCategoryInput;
};


export type MutationCreateParentCategoryArgs = {
  data: NewParentCategoryInput;
};


export type MutationCreateProductArgs = {
  data: NewProductInput;
};


export type MutationCreateProductCharacteristicArgs = {
  data: NewProductCharacteristicInput;
};


export type MutationCreateProduct_PictureArgs = {
  data: NewProduct_PictureInput;
};


export type MutationCreateReviewArgs = {
  data: NewReviewInput;
};


export type MutationCreateUserArgs = {
  data: NewUserInput;
};


export type MutationDeleteAgencyArgs = {
  agencyId: Scalars['Float']['input'];
};


export type MutationDeleteBookingItemArgs = {
  bookingItemId: Scalars['Float']['input'];
};


export type MutationDeleteBrandArgs = {
  brandId: Scalars['Int']['input'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Float']['input'];
};


export type MutationDeleteParentCategoryArgs = {
  parentCategoryId: Scalars['Float']['input'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['Float']['input'];
};


export type MutationDeleteProduct_PictureArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationUpdateAgencyArgs = {
  agencyId: Scalars['Float']['input'];
  data: UpdateAgencyInput;
};


export type MutationUpdateBookingArgs = {
  bookingId: Scalars['Float']['input'];
  data: UpdateBookingInput;
};


export type MutationUpdateBookingItemArgs = {
  bookingItemId: Scalars['Float']['input'];
  data: UpdateBookingItemInput;
};


export type MutationUpdateBrandArgs = {
  brandId: Scalars['Int']['input'];
  data: UpdateBrandInput;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['Float']['input'];
  data: UpdateCategoryInput;
};


export type MutationUpdateParentCategoryArgs = {
  data: UpdateParentCategoryInput;
  parentCategoryId: Scalars['Float']['input'];
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
  productId: Scalars['Float']['input'];
};


export type MutationUpdateProductCharacteristicArgs = {
  data: NewProductCharacteristicInput;
  id: Scalars['Float']['input'];
};


export type MutationUpdateProduct_PictureArgs = {
  data: UpdateProduct_PictureInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateProfileArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateReviewArgs = {
  data?: InputMaybe<UpdateReviewInput>;
  reviewId: Scalars['Int']['input'];
};

export type NewAgencyInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  postcode: Scalars['String']['input'];
};

export type NewBookingInput = {
  agency: AgencyId;
  bookingDate: Scalars['DateTimeISO']['input'];
  endDate: Scalars['DateTimeISO']['input'];
  productCodeId?: InputMaybe<Scalars['Int']['input']>;
  productId: Scalars['Int']['input'];
  quantity?: Scalars['Int']['input'];
  size?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['DateTimeISO']['input'];
  status: StatusBooking;
  user: UserId;
};

export type NewBookingItemInput = {
  booking: BookingId;
  endDate: Scalars['DateTimeISO']['input'];
  productCodeId: ProductId;
  productId: ProductId;
  startDate: Scalars['DateTimeISO']['input'];
  status: BookingItemStatus;
};

export type NewBrandInput = {
  logo: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type NewCategoryInput = {
  name: Scalars['String']['input'];
  parentCategory?: InputMaybe<ParentCategoryId>;
  thumbnail: Scalars['String']['input'];
};

export type NewParentCategoryInput = {
  name: Scalars['String']['input'];
};

export type NewProductInput = {
  brand: BrandId;
  category?: InputMaybe<CategoryId>;
  characteristics?: InputMaybe<CharacteristicId>;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  thumbnail: Scalars['String']['input'];
};

export type NewProduct_PictureInput = {
  alt: Scalars['String']['input'];
  productId: ProductId;
  thumbnail: Scalars['String']['input'];
};

export type NewReviewInput = {
  comment: Scalars['String']['input'];
  productId: ProductId;
  rate: Scalars['Int']['input'];
  userId: UserId;
};

export type NewUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ObjectId = {
  id: Scalars['Int']['input'];
};

export type ParentCategory = {
  __typename?: 'ParentCategory';
  categories: Array<Category>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ParentCategoryId = {
  id: Scalars['Int']['input'];
};

export type Product = {
  __typename?: 'Product';
  bookingItem: Array<BookingItem>;
  brand: Brand;
  category: Category;
  characteristics: Array<ProductCharacteristic>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pictures: Array<Product_Picture>;
  price: Scalars['Float']['output'];
  productCodes: Array<ProductCode>;
  reviews?: Maybe<Array<Review>>;
  thumbnail: Scalars['String']['output'];
};

export type ProductCharacteristic = {
  __typename?: 'ProductCharacteristic';
  characteristic: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  product: Product;
};

export type ProductCode = {
  __typename?: 'ProductCode';
  agency?: Maybe<Agency>;
  bookingItems?: Maybe<Array<BookingItem>>;
  id: Scalars['Int']['output'];
  isSizeable: Scalars['Boolean']['output'];
  product?: Maybe<Product>;
  size?: Maybe<Scalars['String']['output']>;
  status: Status;
};

export type ProductId = {
  id: Scalars['Int']['input'];
};

export type Product_Picture = {
  __typename?: 'Product_picture';
  alt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  thumbnail: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAgencyById: Agency;
  getAllAgencies: Array<Agency>;
  getAllBooking: Array<Booking>;
  getAllBrands: Array<Brand>;
  getAllCategories: Array<Category>;
  getAllParentCategories: Array<ParentCategory>;
  getAllProductCharacteristics: Array<ProductCharacteristic>;
  getAllProduct_codes: Array<ProductCode>;
  getAllProduct_pictures: Array<Product_Picture>;
  getAllProducts: Array<Product>;
  getAllReviews: Array<Review>;
  getAllUsers: Array<User>;
  getBookingById: Booking;
  getBookingItems: Array<BookingItem>;
  getBookingItemsByBookingId: Array<BookingItem>;
  getBookingsByUser: Array<Booking>;
  getBrandById: Brand;
  getCategoryById: Category;
  getParentCategoryById: ParentCategory;
  getProductById: Product;
  getProductCharacteristicsById: Array<ProductCharacteristic>;
  getProductCharacteristicsByProductId: Array<ProductCharacteristic>;
  getProductCodesByStatus: Array<ProductCode>;
  getReviewById: Review;
  getReviewsByProductId: Array<Review>;
  getReviewsByUserId: Array<Review>;
  profile: User;
};


export type QueryGetAgencyByIdArgs = {
  agencyId: Scalars['Int']['input'];
};


export type QueryGetAllBookingArgs = {
  agencyId?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetAllCategoriesArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  parentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllParentCategoriesArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllProductsArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllReviewsArgs = {
  productId?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetBookingByIdArgs = {
  bookingId: Scalars['Int']['input'];
};


export type QueryGetBookingItemsByBookingIdArgs = {
  bookingId: Scalars['Float']['input'];
};


export type QueryGetBookingsByUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetBrandByIdArgs = {
  brandId: Scalars['Int']['input'];
};


export type QueryGetCategoryByIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryGetParentCategoryByIdArgs = {
  parentCategoryId: Scalars['Int']['input'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryGetProductCharacteristicsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetProductCharacteristicsByProductIdArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryGetProductCodesByStatusArgs = {
  status: Status;
};


export type QueryGetReviewByIdArgs = {
  productId?: InputMaybe<Scalars['Float']['input']>;
  reviewId: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetReviewsByProductIdArgs = {
  productId: Scalars['Float']['input'];
  userId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetReviewsByUserIdArgs = {
  productId?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['Int']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  rate: Scalars['Int']['output'];
  user: User;
};

/** Check if the product is available. */
export enum Status {
  Available = 'AVAILABLE',
  Broken = 'BROKEN'
}

/** Check booking's state. */
export enum StatusBooking {
  Booked = 'BOOKED',
  Canceled = 'CANCELED',
  Late = 'LATE',
  Retrieved = 'RETRIEVED'
}

export type UpdateAgencyInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postcode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBookingInput = {
  agency?: InputMaybe<AgencyId>;
  bookingDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  endDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  status: StatusBooking;
};

export type UpdateBookingItemInput = {
  booking?: InputMaybe<BookingId>;
  endDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  id: Scalars['Int']['input'];
  productCodeId?: InputMaybe<ProductId>;
  productId?: InputMaybe<ProductId>;
  startDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  status?: InputMaybe<BookingItemStatus>;
};

export type UpdateBrandInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  parentCategory?: InputMaybe<ParentCategoryId>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateParentCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  brand?: InputMaybe<ObjectId>;
  category?: InputMaybe<ObjectId>;
  characteristics?: InputMaybe<Array<ObjectId>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProduct_PictureInput = {
  alt: Scalars['String']['input'];
  productId?: InputMaybe<ProductId>;
  thumbnail: Scalars['String']['input'];
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postcode?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  avatar: Scalars['String']['output'];
  bookings: Array<Booking>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  postcode: Scalars['String']['output'];
  reviews: Array<Review>;
  role: Scalars['String']['output'];
};

export type UserId = {
  id: Scalars['Int']['input'];
};

export type NewProductCharacteristicInput = {
  characteristic: Scalars['String']['input'];
  productId: ProductId;
};
