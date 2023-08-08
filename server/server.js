const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const app = express();
const PORT = 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startApolloServer() {
    await server.start()
    server.applyMiddleware({ app })
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log('listening on localhost:' + PORT);
            console.log('use GraphQL at localhost:' + PORT + server.graphqlPath);
        })
    })
}

startApolloServer();