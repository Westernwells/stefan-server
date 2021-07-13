require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Service {
    service: String
  }
  type Type {
    type: String
  }
  type Segment {
    segment: String
  }

  # The "Query" type is special: it lists all of the available queries that
  type Query {
    services: [Service]
    types: [Type]
    segments: [Segment]
  }
`;

// Mock Datas
  const services = [ {service:'None'},{service:'Support Level 1'},{service:'Full Service'}];
  const types = [ {type:'Partner'},{type:'Owner'},{type:'Public'}];
  const segments = [ {segment:'Retail'},{segment:'Whole seller'},{segment:'Manufacturer'},{segment:'Consumer'}];

//   The resolvers
  const resolvers = {
    Query: {
      services: () => services,
      types: () => types,
      segments: () => segments
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`
      🚀  Server is ready at ${url}
      📭  Query at https://studio.apollographql.com/dev
    `);
  });