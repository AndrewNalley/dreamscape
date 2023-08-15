import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import background from "../assets/images/tree.jpg"
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
      password: '',
    });
  };
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }


  return (

    <>
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
          {/* <p className='d-flex justify-content-center text-info bg-dark m-3'>
          Imagine escaping to a tranquil paradise, where the worries of everyday life fade away and serenity takes over. Welcome to Dreamsacpe, a place where you can truly unwind, recharge, and find inner peace amidst the beauty of nature.</p> */}

          {/* 
<Link className='px-1' to="/signUp">New To Dreamscape Sign Up today</Link>
<Link className='px-1' to="/storyWell">StoryWell</Link>
<Link className='px-1' to="/visual">Visual</Link>
<Link className='px-1' to="/text">Text</Link>
<Link className='px-1' to="/scene">Scene</Link>
<Link className='px-1' to="/Profile">Profile</Link>
<Link className='px-1' to="/Preview">Preview</Link>
<Link className='px-1' to="/DreamForge">DreamForge</Link>     
<Link className='px-1' to="/Demo">Demo</Link>
<Link className='px-1' to="/Audio">Audio</Link> */}

          {data ? (
            <p>
              Success! You may now head{<Navigate to='/Profile' />}

            </p>
          ) : (
            <div className="card mx-auto" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '25%', }}>
              <form className=' align-self-center ' onSubmit={handleFormSubmit}>
                <h3 className="m-3 text-white">Login</h3>
                <p className="text-white">User name</p>
                <input
                  className="form-input d-flex flex-column m-2 "
                  placeholder="User name"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <p className="text-white">Password</p>
                <input
                  className="form-input m-2"
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

                <div class="d-flex flex-row m-2">

                  <p className='text-white m-1'>New To Dreamscape Sign up</p>
                  <Link to="/signUp">

                    <button
                      className="btn btn-block btn-primary"
                      style={{ cursor: 'pointer' }}>
                      Sign-Up
                    </button>
                  </Link>
                </div>

              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default HomePage; 