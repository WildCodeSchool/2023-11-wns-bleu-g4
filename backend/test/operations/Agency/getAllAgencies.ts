import gql from "graphql-tag"

export default gql`
query GetAllAgenciesQuery {
  getAllAgencies {
    id
    name
    address
    city
    country
    email
    phone
    postcode
    productCodes {
      id
      isSizeable
      size
      status
      product {
        id
      }
    }
    bookings {
      id
      status
      startDate
      endDate
    }
  }
}
`
