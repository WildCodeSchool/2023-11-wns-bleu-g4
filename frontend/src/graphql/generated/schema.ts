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
  DateTimeISO: any;
};

export type Agency = {
  __typename?: 'Agency';
  address: Scalars['String'];
  bookings: Array<Booking>;
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phone: Scalars['String'];
  postcode: Scalars['String'];
  productCodes: Array<Product_Code>;
};

export type AgencyId = {
  id: Scalars['Int'];
};

export type Booking = {
  __typename?: 'Booking';
  agency: Agency;
  bookingDate: Scalars['DateTimeISO'];
  bookingItem: Array<BookingItem>;
  endDate: Scalars['DateTimeISO'];
  id: Scalars['Int'];
  invoice: Scalars['String'];
  startDate: Scalars['DateTimeISO'];
  status: StatusBooking;
  user: User;
};

export type BookingId = {
  id: Scalars['Int'];
};

export type BookingItem = {
  __typename?: 'BookingItem';
  booking: Booking;
  id: Scalars['Int'];
  product: Product;
  productCode: Product_Code;
  status: BookingItemStatus;
};

/** Check bookingItem's status. */
export enum BookingItemStatus {
  Broken = 'BROKEN',
  Lost = 'LOST',
  Rented = 'RENTED',
  Returned = 'RETURNED'
}

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['Int'];
  logo: Scalars['String'];
  name: Scalars['String'];
  product: Array<Product>;
};

export type BrandId = {
  id: Scalars['Int'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  parentCategories: Array<ParentCategory>;
  products: Array<Product>;
  thumbnail: Scalars['String'];
};

export type CategoryId = {
  id: Scalars['Int'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelBooking: Scalars['String'];
  confirmEmail: Scalars['String'];
  createAgency: Agency;
  createBooking: Booking;
  createBookingItem: BookingItem;
  createBrand: Brand;
  createCategory: Category;
  createParentCategory: ParentCategory;
  createProduct: Product;
  createProduct_picture: Product_Picture;
  createReview: Review;
  createUser: User;
  deleteAgency: Scalars['String'];
  deleteBookingItem: Scalars['String'];
  deleteBrand: Scalars['Boolean'];
  deleteCategory: Scalars['String'];
  deleteParentCategory: Scalars['String'];
  deleteProduct: Scalars['String'];
  deleteProduct_picture: Scalars['Boolean'];
  deleteReview: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  updateAgency: Agency;
  updateBooking: Booking;
  updateBookingItem: BookingItem;
  updateBrand: Brand;
  updateCategory: Category;
  updateParentCategory: ParentCategory;
  updateProduct: Product;
  updateProduct_picture: Product_Picture;
  updateProfile: User;
  updateReview: Review;
};


export type MutationCancelBookingArgs = {
  bookingId: Scalars['Float'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
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
  agencyId: Scalars['Float'];
};


export type MutationDeleteBookingItemArgs = {
  bookingItemId: Scalars['Float'];
};


export type MutationDeleteBrandArgs = {
  brandId: Scalars['Int'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Float'];
};


export type MutationDeleteParentCategoryArgs = {
  parentCategoryId: Scalars['Float'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['Float'];
};


export type MutationDeleteProduct_PictureArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['Float'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationUpdateAgencyArgs = {
  agencyId: Scalars['Float'];
  data: UpdateAgencyInput;
};


export type MutationUpdateBookingArgs = {
  bookingId: Scalars['Float'];
  data: UpdateBookingInput;
};


export type MutationUpdateBookingItemArgs = {
  bookingItemId: Scalars['Float'];
  data: UpdateBookingItemInput;
};


export type MutationUpdateBrandArgs = {
  brandId: Scalars['Int'];
  data: UpdateBrandInput;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['Float'];
  data: UpdateCategoryInput;
};


export type MutationUpdateParentCategoryArgs = {
  data: UpdateParentCategoryInput;
  parentCategoryId: Scalars['Float'];
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
  productId: Scalars['Float'];
};


export type MutationUpdateProduct_PictureArgs = {
  data: UpdateProduct_PictureInput;
  id: Scalars['Int'];
};


export type MutationUpdateProfileArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateReviewArgs = {
  data?: InputMaybe<UpdateReviewInput>;
  reviewId: Scalars['Int'];
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

export type NewBookingInput = {
  agency: AgencyId;
  bookingDate: Scalars['DateTimeISO'];
  endDate: Scalars['DateTimeISO'];
  invoice: Scalars['String'];
  startDate: Scalars['DateTimeISO'];
  status: StatusBooking;
  user: UserId;
};

export type NewBookingItemInput = {
  booking: BookingId;
  productCodes: ProductId;
  status: BookingItemStatus;
};

export type NewBrandInput = {
  logo: Scalars['String'];
  name: Scalars['String'];
};

export type NewCategoryInput = {
  name: Scalars['String'];
  parentCategories?: InputMaybe<ParentCategoryId>;
  thumbnail: Scalars['String'];
};

export type NewParentCategoryInput = {
  name: Scalars['String'];
};

export type NewProductInput = {
  brand: BrandId;
  categorie?: InputMaybe<CategoryId>;
  characteristic?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  thumbnail: Scalars['String'];
};

export type NewProduct_PictureInput = {
  alt: Scalars['String'];
  productId: ProductId;
  thumbnail: Scalars['String'];
};

export type NewReviewInput = {
  comment: Scalars['String'];
  productId: ProductId;
  rate: Scalars['Int'];
  userId: UserId;
};

export type NewUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type ParentCategory = {
  __typename?: 'ParentCategory';
  category: Category;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ParentCategoryId = {
  id: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  bookingItem: Array<BookingItem>;
  brand: Brand;
  category: Category;
  characteristic?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  pictures: Array<Product_Picture>;
  price: Scalars['Float'];
  productCodes: Array<Product_Code>;
  reviews: Array<Review>;
  thumbnail: Scalars['String'];
};

export type ProductId = {
  id: Scalars['Int'];
};

export type Product_Code = {
  __typename?: 'Product_code';
  agency?: Maybe<Agency>;
  bookingItems?: Maybe<Array<BookingItem>>;
  id: Scalars['Int'];
  product?: Maybe<Product>;
  status: Status;
};

export type Product_Picture = {
  __typename?: 'Product_picture';
  alt: Scalars['String'];
  id: Scalars['Int'];
  product: Product;
  thumbnail: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAgencyById: Agency;
  getAllAgencies: Array<Agency>;
  getAllBooking: Array<Booking>;
  getAllBrands: Array<Brand>;
  getAllCategories: Array<Category>;
  getAllParentCategories: Array<ParentCategory>;
  getAllProduct_codes: Array<Product_Code>;
  getAllProduct_pictures: Array<Product_Picture>;
  getAllProducts: Array<Product>;
  getAllReviews: Array<Review>;
  getBookingById: Booking;
  getBookingItems: Array<BookingItem>;
  getBookingItemsByBookingId: Array<BookingItem>;
  getBookingsByUser: Array<Booking>;
  getBrandById: Brand;
  getCategoryById: Category;
  getParentCategoryById: ParentCategory;
  getProductById: Product;
  getProductCodesByStatus: Array<Product_Code>;
  getReviewById: Review;
  getReviewsByProductId: Array<Review>;
  getReviewsByUserId: Array<Review>;
  profile: User;
};


export type QueryGetAgencyByIdArgs = {
  agencyId: Scalars['Int'];
};


export type QueryGetAllBookingArgs = {
  agencyId?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetAllCategoriesArgs = {
  name?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['Int']>;
  subCategoryId?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllParentCategoriesArgs = {
  categoryId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllProductsArgs = {
  categoryId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllReviewsArgs = {
  productId?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetBookingByIdArgs = {
  bookingId: Scalars['Int'];
};


export type QueryGetBookingItemsByBookingIdArgs = {
  bookingId: Scalars['Float'];
};


export type QueryGetBookingsByUserArgs = {
  userId: Scalars['Int'];
};


export type QueryGetBrandByIdArgs = {
  brandId: Scalars['Int'];
};


export type QueryGetCategoryByIdArgs = {
  categoryId: Scalars['Int'];
};


export type QueryGetParentCategoryByIdArgs = {
  parentCategoryId: Scalars['Int'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['Int'];
};


export type QueryGetProductCodesByStatusArgs = {
  status: Status;
};


export type QueryGetReviewByIdArgs = {
  productId?: InputMaybe<Scalars['Float']>;
  reviewId: Scalars['Int'];
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetReviewsByProductIdArgs = {
  productId: Scalars['Float'];
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetReviewsByUserIdArgs = {
  productId?: InputMaybe<Scalars['Float']>;
  userId: Scalars['Int'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String'];
  id: Scalars['Int'];
  product: Product;
  rate: Scalars['Int'];
  user: User;
};

/** Check if the product is available or booked. */
export enum Status {
  Available = 'AVAILABLE',
  Booked = 'BOOKED'
}

/** Check booking's state. */
export enum StatusBooking {
  Booked = 'BOOKED',
  Canceled = 'CANCELED',
  Late = 'LATE',
  Retrieved = 'RETRIEVED'
}

export type UpdateAgencyInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
};

export type UpdateBookingInput = {
  agency?: InputMaybe<AgencyId>;
  bookingDate?: InputMaybe<Scalars['DateTimeISO']>;
  endDate?: InputMaybe<Scalars['DateTimeISO']>;
  invoice?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTimeISO']>;
  status: StatusBooking;
};

export type UpdateBookingItemInput = {
  status: BookingItemStatus;
};

export type UpdateBrandInput = {
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
  name?: InputMaybe<Scalars['String']>;
  parentCategories?: InputMaybe<ParentCategoryId>;
};

export type UpdateParentCategoryInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProductInput = {
  brand?: InputMaybe<ObjectId>;
  categorie?: InputMaybe<ObjectId>;
  characteristic?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type UpdateProduct_PictureInput = {
  alt: Scalars['String'];
  productId?: InputMaybe<ProductId>;
  thumbnail: Scalars['String'];
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  rate?: InputMaybe<Scalars['Float']>;
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
  bookings: Array<Booking>;
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  phone: Scalars['String'];
  postcode: Scalars['String'];
  reviews: Array<Review>;
  role: Scalars['String'];
};

export type UserId = {
  id: Scalars['Int'];
};
