import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Auth from '../utils/auth'

const Profile = () => {
    const { username: userParam } = useParams()

    const { loading, data } = useQuery()

    const user =data?.me || data?.user || {}

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to='/me' />
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
         <div className='flex-row justify-center'>
            <h2 className='col-12 col-md-10 bg-dark text-light p-3'>- Welcome `${user.username}` -</h2>
         </div>
         <div className='flex-row justify-content-evenly'>
            <div>
            <Button variant='primary' size='lg'>CREATE NEW MINDFULNESS JOURNEY</Button>
            </div>
            <div>
                <h3 className='p-3'>DREAMSCAPES</h3>
                <p>Iterate through Journey's Here</p>
            </div>
            <div>
                <Button variant='primary' size='lg'>VISIT COMMUNITY STORY WELL</Button>
            </div>
         </div>
        </>
    )
}

export default Profile