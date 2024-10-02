import { registerEnumType } from "type-graphql"

export enum SortProduct {
	ASC = "ASC",
	DESC = "DESC",
	// AVG = "POPULAR"
}

registerEnumType(SortProduct, {
	name: "SortProduct",
})
