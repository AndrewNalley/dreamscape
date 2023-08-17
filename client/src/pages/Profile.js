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
  border: 'none',
  fontWeight: 'bold',
}

const profileStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/cosmos.jpg)`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh'
}

const columnStyle = {
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  backgroundColor: 'black',
}

const Profile = () => {
  const { username: userParam } = useParams()
  const [createdStoryId, setCreatedStoryId] = useState('')
  const [createdStoryTitle, setCreatedStoryTitle] = useState('')
  const [userRefresh, setUserRefresh] = useState(true)
  const { loading, data } = useQuery(userParam ? QUERY_USER : GET_ME, {
    variables: { username: userParam },
    pollInterval: 3000,
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
      <div className='d-flex flex-row justify-content-between p-4 '>
        <Link to="/">
          <button className="btn btn-lg btn-light m-2 text-center" style={{ ...linkStyle, backgroundColor: '#a00ffa', transition: 'box-shadow 0.3s ease', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }}>Home</button>
        </Link>
        <h2 style={{ fontSize: '3.5em', color: '#fa0f5d' }}>
          {" "}
          {user.username.split("").map((letter, index) => (
            <span key={index} style={{ textShadow: "0 0 24px #a00ffa" }}>
              {letter}
            </span>
          ))}
        </h2>
        <button className='btn btn-lg btn-light m-2 text-center' style={{ ...linkStyle, backgroundColor: '#a00ffa', transition: 'box-shadow 0.3s ease', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }} onClick={logout}>
          Logout
        </button>
      </div>
      <div className='d-flex flex-row justify-content-center mt-4' style={{ minHeight: '300px' }}>
        <div className='d-flex flex-column align-items-center justify-content-center w-25'>
          {/* Add Story */}
          {createdStoryId ? (
            <Link to={`/dreamforge/${createdStoryId}`}>
              <button className="btn btn-lg btn-dark m-2">Add Scenes to "{createdStoryTitle}"</button>
            </Link>
          ) : (
            <div className="card mb-2 align-items-center " style={{ backgroundColor: 'black', color: '#fa0f5d', fontSize: '1.6em', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '15px', transition: 'box-shadow 0.3s ease', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }}>
              <div className="card-header text">DREAMFORGE</div>
              <form onSubmit={handleCreateStory}>
                <input
                  type='text'
                  placeholder='Story Title'
                  name='title'
                  maxLength={32}
                  className="form-control mb-2 mr-sm-2"
                />
                <button className="btn btn-lg btn-dark mb-2" type='submit'>New Story</button>
              </form>
            </div>
            
          )}
        </div>
        <div className='d-flex flex-column align-items-center w-25'>
          {/* Dreamscapes */}
          <div>
            <h3 className='p-2 shadow-lg w-auto card mx-2 mt-4 mb-2' style={{ backgroundColor: 'black', color: '#fa0f5d', fontSize: '2em', fontWeight: 'bold', borderRadius: '15px' }}>DREAMSCAPES</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {(user.stories || []).map((story) => (
              story.scenes.length > 0 ? (
                <div key={story._id} className="card mb-1 d-flex justify-content-between" style={{ border: 'none', backgroundColor: 'transparent', borderRadius: 0 }}>
                  <Link style={{ ...linkStyle, borderRadius: '10px', flex: '1' }} to={`/story/${story._id}`}>
                    <div className='text-center' style={{ backgroundColor: '#a00ffa', color: 'white', padding: '4px', borderRadius: '10px' }}>{story.title}</div>
                  </Link>
                </div>
              ) : null
            ))}
            </div>
          </div>
        </div>
        <div className='d-flex flex-column align-items-center justify-content-center w-25 p-4' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {/* Community */}
          <Link className='card text-center' style={{ ...linkStyle, backgroundColor: 'black', color: '#fa0f5d', fontSize: '1.6em', fontWeight: 'bold', maxWidth: '200px', borderRadius: '20px', transition: 'box-shadow 0.3s ease', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }} to='/storyWell'>
            <div className='d-flex flex-column align-items-center p-2' style={{ color: '#a00ffa' }}>
              <span className='mt-1 mb-0'>COMMUNITY</span>
              <span className='mt-0 mb-1'>STORY WELL</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Profile