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
     <div style= {{backgroundImage:`url(${background})`, backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
          }}>
        <div className="position-absolute top-50 start-50 translate-middle" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '30', }}>
      <h2 className='text-white m-1'>Thanks for experiencing: {story.title}</h2>
      
  
       <h3 className='text-white m-1'> Created By: { username }</h3>
       <h4 className='text-white m-1'> Images provided by Pixabay </h4>
              <div className='rounded-circle bg-primary '></div>
              <Link to="/profile">
              <button className=" text-white rounded-pill btn-block btn-primary " style={{ margin: '10px', backgroundColor:'rgba(0, 0, 0, 0.7)',cursor: 'pointer'}}> Return to Profile</button>
              </Link>
      </div>
      </div>

      </>
  )
}

export default Credits
