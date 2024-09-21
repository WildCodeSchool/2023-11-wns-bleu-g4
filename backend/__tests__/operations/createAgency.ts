import gql from 'graphql-tag'

export default gql`
mutation CreateAgency($data: NewAgencyInput!) {
    createAgency(data: $data) {
      id
      name
      address
      postcode
      city
      country
      phone
      email
    }
  }
`