const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');
const { context } = require('./utils/auth');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


async function startApolloServer() {
    await server.start()
    server.applyMiddleware({ app })
    db.once('open', () => {
        app.listen(PORT, HOST, () => {
            console.log('listening on localhost: Port' + PORT + ' Host: ' + HOST);
            console.log('use GraphQL at localhost:' + PORT + server.graphqlPath);
        })
    })
}

startApolloServer();