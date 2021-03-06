const { ApolloServer } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');

const mongoose = require("mongoose");
require('dotenv').config();

const Post = require("./models/Post");

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const MONGODB_CONNECT = process.env.MONGODB_CONNECT;
const pubsub = new PubSub();

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers,context:({req})=>({req,pubsub}) });

// connecting the mongoDb server
// console.log(process.env.MONGODB_CONNECT)
mongoose.connect(MONGODB_CONNECT,
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