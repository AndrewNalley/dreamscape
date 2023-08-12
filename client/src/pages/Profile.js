import React from 'react'
// import { Navigate, useParams } from 'react-router-dom'
// import { useQuery } from '@apollo/client'
// import { Button } from 'react-bootstrap'
import { GET_ME, QUERY_USER } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';

import Auth from '../utils/auth'

const Profile = () => {
    const { username: userParam } = useParams()

    const { loading, data } = useQuery(userParam ? QUERY_USER: GET_ME, {
        variables: { username: userParam },
      })
     

    const user =data?.me || data?.user || {}
    console.log(user)
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to='/Profile' />
    }

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!user?.username) {
        return (
          <h4>
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </h4>
        );
      }

    return (
        <>
         <div className='d-flex flex-row justify-content-center'>
            <h2 className=''>- Welcome User -</h2>
         </div>
         <div className='d-flex flex-row justify-content-around'>
            <div className='d-flex align-self-center w-25 '>
            <div className='rounded-circle bg-primary '>CREATE NEW MINDFULNESS JOURNEY</div>
            </div>
            <div>
                <h3 className='p-3'>DREAMSCAPES</h3>
                <p>Iterate through Journey's Here</p>
            </div>
            <div className='align-self-center w-25 justify-content-center'>
                <div className='rounded-circle bg-primary'>VISIT COMMUNITY STORY WELL</div>
            </div>
         </div>
        </>
    )
}

export default Profile