import { cache } from "@/graphql/client";

export const getQueryVariables = (query: string) => {
  const initialQueryVariables = cache.extract().ROOT_QUERY!;
  const queryVariables = Object.keys(initialQueryVariables).filter(key => key.includes(query));
  const variables = JSON.parse(queryVariables[0].split("(")[1].split(")")[0]);
  return variables;
};
