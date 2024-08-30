import { ApolloClient, InMemoryCache } from "@apollo/client";
const uri = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

export const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: uri || "/graphql",
  cache: cache,
  credentials: "include",
});

export default client;