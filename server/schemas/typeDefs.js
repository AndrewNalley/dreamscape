const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
        stories: [Story]
    }

    type Auth {
        token: ID
        user: User
    }

    type Story {
        title: String
        scenes: [Scene]
        shared: Boolean
    }

    type Scene {
        indexOrder: String
        imagePath: String
        text: String
        audio: String
    }

    type Query {
        me: User
        communityStories: [Story]
        story(id: ID!): Story
        stories: [Story]
    }

    type Mutation {
        createUser(username: String!, password: String!): Auth
        updateUser(username: String!, password: String!): Auth
        login(name: String!, password: String!): Auth
        createStory(title: String!): Story
        updateStory(id: ID!): Story
        createScene(
            storyId: ID!
            imagePath: String!
            text: String
            audio: String
            ): Scene
        updateScene(
            id: ID!
            imagePath: String!
            text: String
            audio: String
            ): Scene
    }
`
module.exports = typeDefs;