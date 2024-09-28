import gql from "graphql-tag"

export default gql`
	mutation CreateParentCategory($data: NewParentCategoryInput!) {
		createParentCategory(data: $data) {
			name
		}
	}
`
