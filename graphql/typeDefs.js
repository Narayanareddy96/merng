const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Post {
    id: ID!,
    body:String!,
    username: String!,
    createdAt:String!,
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }


  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username:String!,password:String!):User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

module.exports = typeDefs;