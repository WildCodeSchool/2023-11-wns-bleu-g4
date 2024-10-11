import gql from "graphql-tag"

export default gql`
	mutation CreateReview($data: NewReviewInput!) {
		createReview(data: $data) {
			id
			comment
			rate
			user {
				id
			}
		}
	}
`
