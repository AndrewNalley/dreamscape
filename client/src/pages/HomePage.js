import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
// const [formState, setFormState] = useState({ email: '', password: '' });
// const [login, { error, data }] = useMutation(LOGIN_USER);

// // update state based on form input changes
// const handleChange = (event) => {
//   const { name, value } = event.target;

//   setFormState({
//     ...formState,
//     [name]: value,
//   });
// };

// // submit form
// const handleFormSubmit = async (event) => {
//   event.preventDefault();
//   console.log(formState);
//   try {
//     const { data } = await login({
//       variables: { ...formState },
//     });

//     Auth.login(data.login.token);
//   } catch (e) {
//     console.error(e);
//   }

//   // clear form values
//   setFormState({
//     email: '',
//     password: '',
//   });
// };
const HomePage = () => {
  return (

    <>
      <div style={{ backgroundColor: "#872657", paddingBottom: "455px" }}>
        <h1 className='d-flex justify-content-center'>DREAMSCAPE</h1>
        <div className="card">
  <div className="card-body">
  Imagine escaping to a tranquil paradise, where the worries of everyday life fade away and serenity takes over. Welcome to Dreamscape, a place where you can truly unwind, recharge, and find inner peace amidst the beauty of nature.
  </div>
</div>
       
<Link to="/signUp">New To Dreamscape Sing Up today</Link>



        <form className=' align-self-center '>
          <h3 className="m-3">Login</h3>
          <p>User name</p>
          <input
            className="form-input d-flex flex-column m-3 "
            placeholder="User name"
            name="email"
           />
          <p>Password</p>
          <input
            className="form-input m-3"
            placeholder="******"
            name="password"
            type="password" />

          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Login
          </button>
     


        </form>
      </div>
     


    </>
  )
}
export default HomePage; 