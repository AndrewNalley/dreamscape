import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import background from "../assets/images/galaxy.jpg"
import Auth from '../utils/auth';

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: '',
   
    password: '',
  });
  const [addUser, {error }] = useMutation(CREATE_USER);

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
      

    Auth.login(data.createUser.token)

    
    } catch (e) {
      console.error(e);
    }
  }
  return (

    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'black',
    }}>
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      width: '100%',
      height: '100vh',
    }}>
      <h1 className='px-4 py-3 text-center text-white'>DREAMSCAPE</h1>
    <main className="card mx-auto" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '25%', }}>
      <div className="col-12 col-lg-10">
      
          <h4 className='text-white m-3'>Sign Up</h4>
       
     
     
              <form form className=' align-self-center ' onSubmit={handleFormSubmit}>
                <input
                  className="form-input m-2"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
       
                <input
                  className="form-input m-2"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary m-2"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Sign-Up
                </button>
              </form>
            

            
           
          </div>
      
   
    </main>
    </div>
    </div>
  );
};

export default SignUp;