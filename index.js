const { ApolloServer, gql } = require('apollo-server');
const mongoose = require("mongoose");
require('dotenv').config();

const Post = require("./models/Post");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Post {
    id: ID,
    body:String,
    username: String,
    createdAt:String,
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getPosts: [Post]
  }
`;

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
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