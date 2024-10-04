import gql from "graphql-tag"

export default gql`
	query GetAllAgencies {
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
