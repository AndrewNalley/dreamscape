import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation  } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import background from "../assets/images/tree.jpg"
const HomePage = (props) => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN);
  const [loginError, setLoginError]= useState(false)
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
      navigate('/Profile')
    } catch (error) {
      // clear form values
      setFormState({
        username: '',
        password: '',
      });
      setLoginError(true)
      console.error(error);
    }
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
                { loginError && (
              <p className='text-danger'>Incorrect username or password  </p>)
                }
                <div className="d-flex flex-row m-2">

                  <p className='text-white m-1'>New To Dreamscape:</p>
                  <Link to="/signUp">

                    <button 
                      className="btn btn-block btn-primary "
                      style={{ cursor: 'pointer', marginLeft:"41px" }}>
                      Sign-Up
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          )}
          <div className="card mx-auto text-white my-3 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '25%', }}>
            <h2 className='text-underline'>Welcome to Dreamscape!</h2> 
            <p>Utilize the Dreamforge to craft new mindfulness journeys. <br/> <br/>
            <span>Create your own calming and inspirational environments.</span> <br/> <br/></p> 
          </div>
        </div>
      </div>
    </>
  )
}
export default HomePage; 