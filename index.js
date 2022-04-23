const { ApolloServer, gql } = require('apollo-server');
const mongoose = require("mongoose");
require('dotenv').config();


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String,
    likeCount:Int,
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;


const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
      likeCount:12,
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
      likeCount:22,
    },
  ];

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
    },
  };


  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// connecting the mongoDb server
// console.log(process.env.MONGODB_CONNECT)
mongoose.connect(process.env.MONGODB_CONNECT,
  {
    useNewUrlParser: true
  }
).then(()=>{
    console.log("MongoDb connected ")
    return server.listen();
})

// The `listen` method launches a web server.
.then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});