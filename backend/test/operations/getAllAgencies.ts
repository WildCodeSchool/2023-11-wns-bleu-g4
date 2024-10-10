import gql from "graphql-tag"

export default gql`
	query GetAllAgenciesQuery {
		getAllAgencies {
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
