import React, { useState } from 'react'
import { GET_ME, QUERY_USER, GET_SCENE, GET_STORY } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { Link, Navigate, useParams } from 'react-router-dom';


const Scene = (props) => {

    let i = 0
    const { storyId } = useParams()
    const { loading, error, data } = useQuery(GET_STORY,
        {
            variables: { storyId }


        })
    //  set data to story from query
    const story = data?.story || {}
    // console.log(story.scenes?.length)
    //  set count to 0 and increase after evey page.
    const [count, setCount] = useState(0);
    // count can't be greater the scenes array.
    const maxCount = story.scenes?.length-1;
    const [showButton, setShowButton] = useState(false);
    const [nextButton, setNextButton]= useState(true)
    const [storyText, setStoryText]= useState(true)
    const [theEnd, setTheEnd] = useState(false)
    const [hideDiv, setHideDiv] = useState(true)
    const increaseCount = () => {
        if (count < maxCount) {
            setCount(count + 1)
        } else if (count === maxCount) {
            setShowButton(true)
            setNextButton(false)
            setStoryText(false)
            setTheEnd(true)
        }

    if(storyText === ""){
      setHideDiv(false)
    }
  





    }
    console.log(maxCount)
    console.log(count)
    const countToZero = () => {
        if (count > 0) {
            setCount(0)
        }
    }

    // const decrease = () => {
    //     if (count > 0) {
    //         setCount(count - 1)
    //     }
    // }



    console.log(story)
    // text from scenes array 
    const text = story.scenes?.[count].text
    // image from scenes array 
    const backgroundImage = story.scenes?.[count].imagePath
    

return (
    <div
      style={{
    
      }}
    >
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          width: '100%', // Ensure the image takes the full width of the container
          height: '100vh', // Ensure the image takes the full height of the viewport
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      > { nextButton && (
           <button className='position-absolute top-0 end-0 text-white rounded-pill '  style={{margin: '10px',  backgroundColor: 'rgba(0, 0, 0, 0.7)'}} onClick={increaseCount}> Next Scene </button>
       
     )}
       
       {showButton && (
            <Navigate to={`/credits/${storyId}`}>
              <button className="position-absolute top-0 end-0 text-white rounded-pill btn-block btn-primary " style={{ margin: '10px', backgroundColor:'rgba(0, 0, 0, 0.7)',cursor: 'pointer'}} onClick={countToZero}> Profile</button>
            </Navigate>
          )}
       
         {hideDiv && (
        <div className="card position-absolute bottom-0 start-0 " style={ { 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        maxWidth: '33%',
        width: 'auto',
        maxHeight: '100vh',
        overflowY: 'auto',
        borderRadius: '10px',
        margin: '10px',
        }}
        >
          {/* <h2>{story.title}</h2> */}

          <div className="card-body">
            {storyText && (
            <p className='text-white ' dangerouslySetInnerHTML={{ __html: text }}/>
                    )}
         
          </div>
       
         
       
        </div>
        )}
      </div>
    </div>
  );
}

export default Scene
