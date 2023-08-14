import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { LOGIN } from '../utils/mutations';

import Auth from '../utils/auth';

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: '',
   
    signUpPassword: '',
  });
  const [addUser, {error }] = useMutation(CREATE_USER);
  const [login, { data }] = useMutation(LOGIN);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data }  = await addUser({
        variables: { ...formState },
      })


    Auth.login(data.addUser.token)
    
    } catch (e) {
      console.error(e);
    }
  }

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
  
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }
    
    // clear form values
    setFormState({
      username: '',
      loginPassword: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {/* {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">Go to Profile.</Link>
              </p>
            ) : ( */}
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
       
                <input
                  className="form-input"
                  placeholder="******"
                  name="signUpPassword"
                  type="password"
                  value={formState.signUpPassword}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            
            {data ? (
              <p>
                Success! You may now head{  <Navigate to='/Profile' />}
              
              </p>
            ) :(

            <form className=' align-self-center ' onSubmit={handleLoginFormSubmit}>
              <h3 className="m-3">Login</h3>
              <p>User name</p>
              <input
                className="form-input d-flex flex-column m-3 "
                placeholder="User name"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
              <p>Password</p>
              <input
                className="form-input m-3"
                placeholder="******"
                name="loginPassword"
                type="password" 
                value={formState.loginPassword}
                onChange={handleChange} />

              <button
                className="btn btn-block btn-primary"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Login
              </button>
        


            </form>)}

                
              
              </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
