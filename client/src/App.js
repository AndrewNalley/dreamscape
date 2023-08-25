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
import "./App.css"

import { setContext } from "@apollo/client/link/context";

import {  DreamForge, HomePage, Profile, Scene, SignUp, StoryWell, Credits } from './pages'

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
  path:"/signUp",
  element: <SignUp/>
},
{
  path:"/storyWell",
  element: <StoryWell />
},


{
  path:"/story/:storyId",
  element:<Scene />
},
{
  path: "/Profile",
  element: <Profile />
},
{
  path: "/dreamforge/:storyId",
  element: <DreamForge />
},
{
  path: "/credits/:storyId",
  element: <Credits/>
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
