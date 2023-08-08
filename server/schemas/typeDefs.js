const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        email: String
        password: String
        campaigns: [Campaign]
    }

    type Auth {
        token: ID
        user: User
    }

    type Campaign {
        name: String
        users: [User]
    }

    type Query {
        user(id: ID!): User
        users: [User]
        campaign(id: ID!): Campaign
        campaigns: [Campaign]
    }

    type Mutation {
        addUser(email: String, password: String): Auth
        createCampaign(name: String!): Campaign
        updateCampaign(userId: ID!): Campaign
    }
`
module.exports = typeDefs;