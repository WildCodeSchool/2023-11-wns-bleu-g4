import gql from "graphql-tag"

export default gql`
query GetAllUsers($limit: Int, $offset: Int, $email: String, $firstname: String, $name: String) {
  getAllUsers(limit: $limit, offset: $offset, email: $email, firstname: $firstname, name: $name) {
    users {
      id
      name
      email
      address
      avatar
      city
      country
      phone
      firstname
      postcode
    }
    total
  }
}
`