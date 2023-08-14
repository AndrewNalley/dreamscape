const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        stories: [Story]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Story {
        _id: ID
        title: String
        user: ID
        scenes: [Scene]
        shared: Boolean
    }

    type Scene {
        _id: ID
        storyId: ID
        indexOrder: String
        imagePath: String
        text: String
    }

    type Query {
        user (id: ID!): User
        me: User
        communityStories: [Story]
        story(storyId: ID!): Story
        scene(sceneId: ID!): Scene
    }

    type Mutation {
        createUser(username: String!, password: String!): Auth
        updateUser(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        createStory(title: String!): Story
        createScene(
            storyId: ID!
            imagePath: String!
            text: String
            audio: String
            ): Scene
        removeStory(storyId: ID!): User
        removeScene(sceneId: ID!): Story
    }
`
module.exports = typeDefs;