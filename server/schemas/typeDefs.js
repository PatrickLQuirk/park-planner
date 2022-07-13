const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Timestamp

  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
    activities: [Activity]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Activity {
    _id: ID!
    startTime: Timestamp!
    endTime: Timestamp!
    title: String!
    description: String
    park: Park!
  }

  type Park {
    _id: ID!
    name: String!
    activities: [ActivityNonPopulated]
  }

  type ActivityNonPopulated {
    _id: ID!
    startTime: Timestamp!
    endTime: Timestamp!
    title: String!
    description: String
    park: ID!
  }
  
  type ParkNonPopulated {
    _id: ID!
    name: String!
    activities: [ID]
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  input ActivityInput {
    startTime: Timestamp!,
    endTime: Timestamp!,
    title: String!,
    description: String,
    park: ID!
  }

  type Query {
    me: User
    allActivities: [Activity]
    allParks: [ParkNonPopulated]
    singlePark(parkId: ID!): Park
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
    saveActivity(activityId: ID!): User
    removeActivity(activityId: ID!): User
  }
`;

module.exports = typeDefs;
