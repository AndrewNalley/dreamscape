import React from 'react'
import UserJourneys from '../components/UserJourneys'
// import { useQuery } from '@apollo/client'
// import { Button } from 'react-bootstrap'
import { GET_ME, QUERY_USER } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { Link, Navigate, useParams } from 'react-router-dom';

import Auth from '../utils/auth'

const linkStyle = {
  textDecoration: 'none',
  color: 'dark',
}

const Profile = () => {
    const { username: userParam } = useParams()

    const { loading, data } = useQuery(userParam ? QUERY_USER: GET_ME, {
        variables: { username: userParam },
      })
     

    const user =data?.me || data?.user || {}
    console.log(user)
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Link to='/Profile' />
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
         <div className='d-flex flex-row justify-content-center m-4'>
            <h2 className=''>- Welcome {user.username} -</h2>
         </div>
         <div className='d-flex flex-row justify-content-around mt-4'>
            <div className='d-flex align-self-center w-25 p-4'>
            <Link style={linkStyle} to='DreamForge'><div className='rounded-circle bg-primary '>CREATE NEW MINDFULNESS JOURNEY</div></Link>
            </div>
            <div>
                <h3 className='p-3 shadow-lg w-auto card h-100'>DREAMSCAPES</h3>
                {/* <UserJourneys 
                stories={user.story}
                title={`${user.story.title}`}/> */}
            </div>
            <div className='align-self-center w-25 justify-content-center p-4'>
               <Link style={linkStyle} to='storyWell'><div className='rounded-circle bg-primary'>VISIT COMMUNITY STORY WELL</div></Link>
            </div>
         </div>
        </>
    )
}

export default Profile