import React from 'react'
import { GET_COMMUNAL } from '../utils/queries'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    border: 'none',
    fontWeight: 'bold',
}

const storyWellStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/cosmos.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh'
}

const StoryWell = () => {
    const { loading, error, data } = useQuery(GET_COMMUNAL)
    console.log(data)

    if (loading) return <p>loading</p>
    if (error) return <p>error: {error.message}</p>

    return (
        <section style={storyWellStyle}>
            <div className='d-flex flex-row justify-content-center p-4'>
                <Link to="/">
                    <button className="btn btn-lg btn-light m-2 text-center" style={{ ...linkStyle, backgroundColor: '#a00ffa', transition: 'box-shadow 0.3s ease', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }}>Home</button>
                </Link>
                <h2 style={{ backgroundColor: 'black', color: '#fa0f5d', fontSize: '2em', fontWeight: 'bold', borderRadius: '15px' }} >StoryWell</h2>
                <Link to="/Profile">
                    <button className="btn btn-lg btn-light m-2 text-center" style={{ ...linkStyle, backgroundColor: '#a00ffa', transition: 'box-shadow 0.3s ease', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }}>Profile</button>
                </Link>
            </div>
            <div className='d-flex row mt-4 justify-content-center' style={{ minHeight: '300px' }}>
                <div style={{ maxHeight: '400px', maxWidth: '50%', overflowY: 'auto' }}>
                    {(data.communityStories).map((story) => (
                        <div key={story._id} className="card mb-1 d-flex justify-content-between" style={{ border: 'none', backgroundColor: 'transparent', borderRadius: 0 }}>
                            <Link style={{ borderRadius: '10px', flex: '1' }} to={`/story/${story._id}`}>
                                <div className='text-center' style={{ backgroundColor: '#a00ffa', color: 'white', padding: '4px', borderRadius: '10px' }}>{story.title}</div>
                            </Link>
                        </div>))}
                </div>
            </div>
        </section>
    )
}

export default StoryWell
