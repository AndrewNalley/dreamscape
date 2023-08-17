import React, { useEffect, useState } from 'react'
// import UserJourneys from '../components/UserJourneys'
// import { Button } from 'react-bootstrap'
import { GET_ME, QUERY_USER } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { CREATE_STORY, REMOVE_STORY } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import { Link, useParams, } from 'react-router-dom';

import Auth from '../utils/auth'

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
}

const profileStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/tree-relaxing.jpg)`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh'
}

const Profile = () => {
  const { username: userParam } = useParams()
  const [createdStoryId, setCreatedStoryId] = useState('')
  const [createdStoryTitle, setCreatedStoryTitle] = useState('')
  const [userRefresh, setUserRefresh] = useState(true)
  const { loading, data } = useQuery(userParam ? QUERY_USER : GET_ME, {
    variables: { username: userParam },
    pollInterval: 5000
  })

  const [createStory] = useMutation(CREATE_STORY)
  const [removeStory] = useMutation(REMOVE_STORY)



  let user = data?.me || data?.user || {}
  console.log(user)



  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.href = '/'
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

  const handleCreateStory = async (event) => {
    event.preventDefault()

    const storyTitle = event.target.elements.title.value.trim()
    if (storyTitle === '') {
      return
    }

    setCreatedStoryTitle(storyTitle)

    const { data } = await createStory({
      variables: {
        title: storyTitle
      }
    })

    const newStoryId = data.createStory._id
    setCreatedStoryId(newStoryId)
    console.log(createdStoryId)
  }

  return (
    <section style={profileStyle}>
      <div className='d-flex flex-row justify-content-between p-4'>
        <Link className="btn btn-lg btn-light m-2" style={linkStyle} to="/">Home</Link>
        <h2 className='text-white'>- Welcome {user.username} -</h2>
        <button className='btn btn-lg btn-light m-2' onClick={logout}>
          Logout
        </button>
      </div>
      <div className='d-flex flex-row justify-content-around mt-4'>
        <div className='d-flex align-self-center w-25 p-5'>
          {createdStoryId ? (
            <Link to={`/dreamforge/${createdStoryId}`}>
              <button>Add Scenes to "{createdStoryTitle}"</button>
            </Link>
          ) : (
            <form onSubmit={handleCreateStory}>
              <input
                type='text'
                placeholder='Story Title'
                name='title'
                maxLength={32}
              />
              <button type='submit'>Add Title</button>
            </form>
          )}
        </div>
        <div className='align-self-center w-25 justify-content-center p-4'>
          <Link className='icon-link link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-light' to='/storyWell'><div className='text-white '>VISIT COMMUNITY STORY WELL</div></Link>
        </div>
        <div>
          <h3 className='p-3 shadow-lg w-auto card mx-4 my-4'>DREAMSCAPES</h3>
          {(user.stories || []).map((story) => (
            story.scenes.length > 0 ? (
              <div key={story._id} className="card mb-3">
                <Link style={linkStyle} to={`/story/${story._id}`}>
                  <div className='rounded-circle bg-primary '>{story.title}</div>
                </Link>
              </div>
            ) : null
          ))}

          {/* <UserJourneys 
                stories={user.story}
                title={`${user.story.title}`}/> */}
        </div>
      </div>
    </section>
  )
}

export default Profile