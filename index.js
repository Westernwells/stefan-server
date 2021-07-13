require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
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
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    services: [Service]
    types: [Type]
    segments: [Segment]
  }
`;

// const books = [
//     {
//       title: 'The Awakening',
//       author: 'Kate Chopin',
//     },
//     {
//       title: 'City of Glass',
//       author: 'Paul Auster',
//     },
//   ];
  const services = [ {service:'None'},{service:'Support Level 1'},{service:'Full Service'}];
  const types = [ {type:'Partner'},{type:'Owner'},{type:'Public'}];
  const segments = [ {segment:'Retail'},{segment:'Whole seller'},{segment:'Manufacturer'},{segment:'Consumer'}];

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