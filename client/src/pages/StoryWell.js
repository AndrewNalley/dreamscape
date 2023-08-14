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
        <>
        <h2>Story Well</h2>
        {(data.communityStories).map((story) => (
            <div key={story._id} className="card mb-3">
            <Link to={`/story/${story._id}`}>
                <div className='rounded-circle bg-primary '>{story.title}</div></Link>
        </div>))}
        </>
    )
}

export default StoryWell
