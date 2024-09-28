import gql from "graphql-tag"

export default gql`
	query GetAllParentCategories {
		getAllParentCategories {
			id
			name
		}
	}
`
