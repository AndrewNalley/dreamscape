import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import SignUp from './pages/SignUp';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <App />

    
  },
{
  path:"signUp",
  element: <SignUp/>
}

])


ReactDOM.render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

