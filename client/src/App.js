
import { BrowserRouter as Router, Routes, Route, Switch  } from 'react-router-dom';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, 
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import HomePage from './pages/HomePage';
import PixabaySearch from './utils/API/photoAPI';
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      
        <>
          <PixabaySearch />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
