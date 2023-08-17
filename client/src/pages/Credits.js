import React, { useState } from 'react'
import { GET_ME, QUERY_USERID, GET_SCENE, GET_STORY } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { Link, Navigate, useParams } from 'react-router-dom';
import { photoArray } from '../assets'





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
      <h2>{story.title}</h2>
      
          <div  className="card mb-3">
       <h2>{ username }</h2>
              <div className='rounded-circle bg-primary '></div>
              <Link to="/profile">
              <button className="position-absolute top-0 end-0 text-white rounded-pill btn-block btn-primary " style={{ margin: '10px', backgroundColor:'rgba(0, 0, 0, 0.7)',cursor: 'pointer'}}> Profile</button>
              </Link>
      </div>
      </>
  )
}

export default Credits
