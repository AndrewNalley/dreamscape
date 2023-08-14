import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

const HomePage = (props) => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }

  return (

    <>
      <div style={{ backgroundColor: "#872657", paddingBottom: "455px" }}>
        <nav className='d-flex justify-content-between align-items-center bg-dark-subtle'>
          <h1 className='px-4 py-3'>DREAMSCAPE</h1>
          <div className='d-flex align-items-center'>
            <div>
              {Auth.loggedIn() ? (
                <>
                  <Link className="btn btn-lg btn-info m-3" to="/Profile">
                    {Auth.getProfile().data.username}'s Profile
                  </Link>
                  <button className="btn btn-lg btn-light m-2" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-lg btn-info m-3" to="/SignupLogin">
                    Sign-up
                  </Link>
                  </>
              )}
            </div>
          </div>
        </nav>
        
        <div className="bg-dark-subtle p-3">
          <div className="card-body">
          Imagine escaping to a tranquil paradise, where the worries of everyday life fade away and serenity takes over. Welcome to Dreamscape, a place where you can truly unwind, recharge, and find inner peace amidst the beauty of nature.
          </div>
        </div>


        {/* <p className='d-flex justify-content-center text-info bg-dark m-3'>
          Imagine escaping to a tranquil paradise, where the worries of everyday life fade away and serenity takes over. Welcome to Dreamsacpe, a place where you can truly unwind, recharge, and find inner peace amidst the beauty of nature.</p> */}


<Link className='px-1' to="/SignupLogin">New To Dreamscape Sign Up today</Link>
<Link className='px-1' to="/storyWell">StoryWell</Link>
<Link className='px-1' to="/visual">Visual</Link>
<Link className='px-1' to="/text">Text</Link>
<Link className='px-1' to="/scene">Scene</Link>
<Link className='px-1' to="/Profile">Profile</Link>
<Link className='px-1' to="/Preview">Preview</Link>
<Link className='px-1' to="/DreamForge">DreamForge</Link>     
<Link className='px-1' to="/Demo">Demo</Link>
<Link className='px-1' to="/Audio">Audio</Link>       
        
        </div>
     


    </>
  )
}
export default HomePage; 