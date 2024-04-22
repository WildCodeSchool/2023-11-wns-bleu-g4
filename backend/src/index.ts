import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { TemplateResolver } from "./resolvers/TemplateResolver";

buildSchema({ resolvers: [TemplateResolver] }).then((schema) => {
  const server = new ApolloServer({ schema });
  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`Server ready on ${url}`);
  });
});
