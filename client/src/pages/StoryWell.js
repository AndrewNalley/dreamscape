import React from 'react'
import { GET_COMMUNAL } from '../utils/queries'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'


const StoryWell = () => {
    const { loading, error, data } = useQuery(GET_COMMUNAL)
    console.log(data)

    if(loading) return <p>loading</p>
    if (error) return <p>error: {error.message}</p>

    return (
        <div className="bg-dark text-center d-flex justify-content-center" style={{ minHeight: '100vh', padding: '20px' }}>
            <div className="w-50 justify-content-center mx-auto">
        <h2 style={{ backgroundColor: 'black', color: '#fa0f5d', fontSize: '2em', fontWeight: 'bold', borderRadius: '15px' }} >Story Well</h2>
        {(data.communityStories).map((story) => (
        <div key={story._id} className="card mb-1 d-flex justify-content-between" style={{ border: 'none', backgroundColor: 'transparent', borderRadius: 0 }}>
        <Link style={{ borderRadius: '10px', flex: '1' }} to={`/story/${story._id}`}>
          <div className='text-center' style={{ backgroundColor: '#a00ffa', color: 'white', padding: '4px', borderRadius: '10px' }}>{story.title}</div>
        </Link>
        </div>))}
        </div>
        </div>
    )
}

export default StoryWell
