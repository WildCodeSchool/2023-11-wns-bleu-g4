import gql from "graphql-tag"

export default gql`
query Query($agencyId: Int!) {
  getAgencyById(agencyId: $agencyId) {
    id
    name
  }
}
`
