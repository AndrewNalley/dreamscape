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

import { Audio, Demo, DreamForge, HomePage, Preview, Profile, Scene, SignUp, StoryWell, Text, Visual } from './pages'

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
  element: <Signup/>
},
{
  path:"storyWell",
  element: <StoryWell />
},
{
  path:"visual",
  element: <Visual />
},
{
  path:"text",
  element: <Text />
},
{
  path:"/story/:storyId",
  element:<Scene />
},
{
  path: "Profile",
  element: <Profile />
},
{
  path:"Preview",
  element: <Preview />
},
{
  path: "/dreamforge",
  element: <DreamForge />
},
{
  path:"Demo",
  element: <Demo />
},
{
  path:"Audio",
  element: <Audio />
},

])

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
   
    </ApolloProvider>
  );
}


export default App;
