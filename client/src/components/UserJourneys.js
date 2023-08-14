import React from 'react'
import { Link } from 'react-router-dom'

const linkStyle = {
    textDecoration: 'none',
    color: 'dark',
  }

const UserJourney = ({
    stories,
    title,
}) => {
    if (!stories.length) {
        return <p>You Have No Stories Yet</p>
    }

    return (
        <>
        {stories && stories.map((story) => (
            <div key={story._id}>
                <p>{title ? (
                    <Link style={linkStyle} to={`/story/${story._id}`}>{story.title}</Link>
                ): ( <>
                <span>This Story has {story.scene.length} scenes</span>
                </>)}</p>
            </div>
        ))}
        </>
    )
}

export default UserJourney