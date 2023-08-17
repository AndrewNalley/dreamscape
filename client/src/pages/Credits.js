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
      </div>
      </>
  )
}

export default Credits
