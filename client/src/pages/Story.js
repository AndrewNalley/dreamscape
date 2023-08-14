import React, { useState } from 'react'
import { GET_ME, QUERY_USER, GET_SCENE, GET_STORY } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';

const Scene = (props) => {

    let i = 0
    const { storyId } = useParams()
    const { loading, error, data } = useQuery(GET_STORY,
        {
            variables: { storyId }


        })
    //  set data to story from query
    const story = data?.story || {}
    console.log(story.scenes?.length)
    //  set count to 0 and increase after evey page.
    const [count, setCount] = useState(0);
    // count can't be greater the scenes array.
    const maxCount = story.scenes?.length - 1;
    const increaseCount = () => {
        if (count < maxCount) {
            setCount(count + 1)
        }
    }
    console.log(count)

    const decrease = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }



    console.log(story.scenes?.[count])
    // text from scenes array 
    const text = story.scenes?.[count].text
    // image from scenes array 
    const backgroundImage = story.scenes?.[count].imagePath



    //   console.log(story)


    return (
        <>
            <div style={{ backgroundImage: `url(${backgroundImage})`, paddingBottom: "600px", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
              

                <div className="card mx-auto " style={{width: "50%"}}>
                <h2>{story.title}</h2>
                    <div className="card-body">
                        <p>{text}</p>
                    </div>
                    <button onClick={increaseCount}> Next Scene </button>
                    <button onClick={decrease}> last Scene </button>

                </div>
            </div>
        </>
    )
}

export default Scene
