import gql from "graphql-tag"

export default gql`
	mutation DeleteAgency($agencyId: Int!) {
		deleteAgency(agencyId: $agencyId)
	}
`
