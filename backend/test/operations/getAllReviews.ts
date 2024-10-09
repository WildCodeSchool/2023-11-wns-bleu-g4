import gql from "graphql-tag"

export default gql`
	query GetAllReviews {
		getAllReviews {
			comment
			id
			rate
			createdAt
			edited
		}
	}
`
