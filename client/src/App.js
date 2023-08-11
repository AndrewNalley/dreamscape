
import { BrowserRouter as Router, Routes, Route, Switch  } from 'react-router-dom';
import logo from './logo.svg';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, 
  createHttpLink,
} from "@apollo/client";
import {
  createBrowserRouter,
  RouterProvider,

  Link,
} from "react-router-dom";


import { setContext } from "@apollo/client/link/context";
import HomePage from './pages/HomePage';
import SignUp from "./pages/SignUp"
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
const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <HomePage />

    
  },
{
  path:"signUp",
  element: <SignUp/>
}

])

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
