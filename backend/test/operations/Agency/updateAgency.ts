import gql from "graphql-tag"

export default gql`
mutation UpdateAgency($data: UpdateAgencyInput!, $agencyId: Int!) {
  updateAgency(data: $data, agencyId: $agencyId) {
    id
    name
    address
    city
    country
    email
    phone
    postcode
  }
}
`
