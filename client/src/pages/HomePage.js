import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

import Auth from '../utils/auth';

const HomePage = (props) => {
const [formState, setFormState] = useState({ username: '', password: '' });
const [login, { error, data }] = useMutation(LOGIN);

// update state based on form input changes
const handleChange = (event) => {
  const { name, value } = event.target;

  setFormState({
    ...formState,
    [name]: value,
  });
};

// submit form
const handleFormSubmit = async (event) => {
  event.preventDefault();
  console.log(formState);
  try {
    const { data } = await login({
      variables: { ...formState },
    });

    Auth.login(data.login.token);
  } catch (e) {
    console.error(e);
  }
  
  // clear form values
  setFormState({
    username: '',
    password: '',
  });
};
const logout = (event) => {
  event.preventDefault();
  Auth.logout();
}


  return (

    <>
      <div style={{ backgroundColor: "#872657", paddingBottom: "455px" }}>
        <h1 className='d-flex justify-content-center'>DREAMSCAPE</h1>
        <div className="card">
  <div className="card-body">
  Imagine escaping to a tranquil paradise, where the worries of everyday life fade away and serenity takes over. Welcome to Dreamscape, a place where you can truly unwind, recharge, and find inner peace amidst the beauty of nature.
  </div>
</div>


        {/* <p className='d-flex justify-content-center text-info bg-dark m-3'>
          Imagine escaping to a tranquil paradise, where the worries of everyday life fade away and serenity takes over. Welcome to Dreamsacpe, a place where you can truly unwind, recharge, and find inner peace amidst the beauty of nature.</p> */}


<Link to="/signUp">New To Dreamscape Sing Up today</Link>
<Link to="/storyWell">storyWell</Link>
<Link to="/visual">visual</Link>
<Link to="/text">text</Link>
<Link to="/scene">scene</Link>
<Link to="/Profile">Profile</Link>
<Link to="/Preview">Preview</Link>
<Link to="/DreamForge">DreamForge</Link>     
<Link to="/Demo">Demo</Link>
<Link to="/Audio">Audio</Link>

{data ? (
              <p>
                Success! You may now head{  <Navigate to='/Profile' />}
              
              </p>
            ) :(

        <form className=' align-self-center ' onSubmit={handleFormSubmit}>
          <h3 className="m-3">Login</h3>
          <p>User name</p>
          <input
            className="form-input d-flex flex-column m-3 "
            placeholder="User name"
            name="username"
            type="text"
            value={formState.name}
            onChange={handleChange}
           />
          <p>Password</p>
          <input
            className="form-input m-3"
            placeholder="******"
            name="password"
            type="password" 
            value={formState.password}
            onChange={handleChange} />

          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Login
          </button>
     


        </form>)}
        
           <div>
           {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/Profile">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/">
                HomePage
              </Link>
              </>
          )}
            </div>     
        
      </div>
     


    </>
  )
}
export default HomePage; 