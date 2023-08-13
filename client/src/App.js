import { BrowserRouter as Router} from 'react-router-dom';

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
import StoryWell from './pages/StoryWell'
import Scene from './pages/Scene'
import Profile from './pages/Profile'
import Preview from './pages/Preview'
import DreamForge from "./pages/DreamForge"
import Audio from "./pages/Audio"
import Demo from "./pages/Demo"
import SignUp from './pages/SignUp';
import Text from './pages/Text'
import Visual from "./pages/Visual"




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
  path:"scene/:sceneId",
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
  path: "DreamForge",
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
