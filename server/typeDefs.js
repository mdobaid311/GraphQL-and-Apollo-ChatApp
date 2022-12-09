import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    messagesByUser(recieverId: Int!): [Message]
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  scalar Date

  type Message {
    id: ID!
    text: String!
    recieverId: Int!
    senderId: Int!
    createdAt: Date!
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createMessage(recieverId: Int!, text: String!): Message
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Subscription{
    messageAdded:Message
  }
`;





export default typeDefs;
