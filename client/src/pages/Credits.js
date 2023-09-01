import React, { useState } from 'react'
import { GET_ME, QUERY_USERID, GET_SCENE, GET_STORY } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { Link, Navigate, useParams } from 'react-router-dom';

import background from "../assets/images/clapBoard.jpg"



const Credits = () => {
  const { storyId } = useParams()
  const { loading, error, data } = useQuery(GET_STORY,
    {
      variables: { storyId }


    })
  const story = data?.story || {}
  const username = story?.username





  return (
    <>
      <div style={{
        backgroundImage: `url(${background})`, backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
      }}>
        <div className='rounded-circle bg-primary '></div>
              <Link to="/profile">
              <button className='position-absolute top-0 end-0 text-white rounded-pill '  style={{margin: '10px',  backgroundColor: 'rgba(0, 0, 0, 0.7)'}}> Return to Profile</button>
              </Link>
        <div className="position-absolute top-50 start-50 translate-middle" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '30', }}>
          <h3 className='text-white m-1'>You experienced:</h3>
          <br />
          <h1 className='text-white m-1 text-center'> {story.title}</h1>
          <br />
          <h4 className='text-white m-1 text-center'> Created By: {username}</h4>
          <br />
          <h6 className='text-white m-1 text-center'> Images provided by Pixabay </h6>
        </div>
      </div>

    </>
  )
}

export default Credits
