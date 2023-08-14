import React, { useState } from 'react'
import { CREATE_SCENE } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import { Link, Navigate, useParams } from 'react-router-dom'


const DreamForge = () => {
    const addScene = useMutation(CREATE_SCENE)
    const [bgImage, setImage] = useState('')
    const [sceneText, setText] = useState('')

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        if (event.target.elements.image) {
        const imageValue = event.target.elements.image.value
        console.log(imageValue)
        setImage(imageValue)    
        }

        if (event.target.elements.text) {
        const textValue = event.target.elements.text.value
        console.log(textValue)
        setText(textValue)    
        }
         

    }
    return (
        <div
        className="bg-image" // You can create a CSS class named 'bg-image' for styling
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', minHeight: '100vh' }}
        >
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9">
                    <input
                        placeholder="choose image"
                        name="image"
                        className="form-input w-100"
                    />
                </div>
            </form>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9">
                    <input
                        placeholder="choose text"
                        name="text"
                        className="form-input w-100"
                    />
                </div>
            </form>

            <div className='flex-row'>
                <div>Story Title</div>
                <h2>DREAM FORGE</h2>
                <div>New Scene</div>
            </div>
            <div className='flex-column justify-left'>
                <div className='m-2'>Text</div>
                <div className='m-2'>Visual</div>
            </div>
            <div className='align-end justify-end'>Finish Story</div>
            <button onClick=''>
                Next Scene
            </button>
            <button onClick=''>
                Finish Story
            </button>
        </div>
    )
}

export default DreamForge