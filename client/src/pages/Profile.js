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
        
    )
}
