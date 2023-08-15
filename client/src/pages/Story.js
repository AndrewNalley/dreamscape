import React, { useState } from 'react'
import { GET_ME, QUERY_USER, GET_SCENE, GET_STORY } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { Link, Navigate, useParams } from 'react-router-dom';
import { photoArray } from '../assets'


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
    const maxCount = story.scenes?.length - 1;
    const [showButton, setShowButton] = useState(false);
    const increaseCount = () => {
        if (count < maxCount) {
            setCount(count + 1)
        } else if (count >= maxCount) {
            setShowButton(true)
        }


    }
    console.log(count)
    const countToZero = () => {
        if (count > 0) {
            setCount(0)
        }
    }

    const decrease = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }



    // console.log(story.scenes?.[count])
    // text from scenes array 
    const text = story.scenes?.[count].text
    // image from scenes array 
    const backgroundImage = story.scenes?.[count].imagePath
    



    //   console.log(story)


//     return (
//         <div
//             style={{
//                 backgroundImage: `url(${backgroundImage})`,
//                 backgroundSize: 'cover',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundAttachment: 'fixed',
//                 backgroundPosition: 'center', // Center the background image
//                 minHeight: '100vh', // Ensure the image covers the full viewport height
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexDirection: 'column',
//             }}
//         >
//             <div className="card mx-auto" style={{ width: '50%' }}>
//                 <h2>{story.title}</h2>
//                 <div className="card-body">
//                     <p>{text}</p>
//                 </div>
//                 <button onClick={increaseCount}>Next Scene</button>
//                 <button onClick={decrease}>Last Scene</button>
//                 {showButton && (
//                     <Link to="/profile">
//                         <button onClick={countToZero}>Profile</button>
//                     </Link>
//                 )}
//             </div>
//         </div>
//     )
// }

return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          width: '100%', // Ensure the image takes the full width of the container
          height: '100vh', // Ensure the image takes the full height of the viewport
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="card mx-auto" style={ {  width: '50%' }}>
          <h2>{story.title}</h2>
          <div className="card-body">
            <p>{text}</p>
          </div>
          <button onClick={increaseCount}> Next Scene </button>
          <button onClick={decrease}> last Scene </button>
          {showButton && (
            <Link to="/profile">
              <button onClick={countToZero}> Profile</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Scene
