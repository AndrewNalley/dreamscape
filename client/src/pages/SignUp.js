import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';


// import { Link } from 'react-router-dom';

// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';

// import Auth from '../utils/auth';

// const Signup = () => {
//   const [formState, setFormState] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [addUser, { error, data }] = useMutation(ADD_USER);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formState);

//     try {
//       const { data } = await addUser({
//         variables: { ...formState },
//       });

//       Auth.login(data.addUser.token);
//     } catch (e) {
//       console.error(e);
//     }
//   };
const SignUp = ()=> {
    return(

<>

    <>
      {/* This is needed for the validation functionality above */}
      <Form >
        {/* show alert if server response is bad */}
        {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert> */}

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            // onChange={handleInputChange}
            // value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            // onChange={handleInputChange}
            // value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            // onChange={handleInputChange}
            // value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          // disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>



{/* <form>
<h3>Sign up</h3>
<input
            className="form-input"
            placeholder="Your username"
            name="username"
            type="text" />
<input
  className="form-input"
  placeholder="Your email"
  name="email"
  type="email" />

<input
            className="form-input"
            placeholder="******"
            name="password"
            type="password" />

            <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>


</form> */}

</>
    )
}
export default SignUp 