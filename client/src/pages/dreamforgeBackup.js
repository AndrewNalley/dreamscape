import React, { useState, useRef } from 'react'
import { CREATE_SCENE } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
// import PoetryAPI from '../utils/API/poetryAPI'
// Import the list of image filenames from the assets folder
import { photoArray } from '../assets'
import PoetryOptions from '../components/PoetryOptions'
import PhotoModal from '../components/PhotoModal'
import { poetryArray } from '../assets/poems'



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        flexBox: 'flex',
        height: 'auto',
        bottom: '0'
    },
};

Modal.setAppElement('#root')

const DreamForge = () => {
    const [value, setValue] = useState("")
    const onInput = (e) => setValue(e.target.value);
    const onSubmit = () => {
        setValue("");
    };
    const [createScene] = useMutation(CREATE_SCENE)
    const [bgImage, setImage] = useState('https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg')
    const [sceneText, setText] = useState('')
    const [formSubmit, setFormSubmit] = useState(false)
    const textInputRef = useRef(null)
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);
    let subtitle
    const [modalIsOpen, setIsOpen] = React.useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00'
    }

    function closeModal() {
        setIsOpen(false)
    }

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
            const formattedText = textValue.replace(/=/g, '<br>');
            setText(formattedText);
            setFormSubmit(true)
        }
        // setCurrentImageIndex(0);
        textInputRef.current.value = ''
    }
    const { storyId } = useParams()
    const handleAddScene = async () => {
        await createScene({
            variables: {
                storyId: storyId,
                imagePath: bgImage,
                text: sceneText
            },

        })
        setImage('')
        setText('')
        console.log(storyId)
        console.log('scene added successfully!')
    }


    const saveImage = (p) => {
        // save the currently set background image (bgImage) to a variable for later use
        const savedImage = p.url;
        setImage(savedImage)
        console.log('Image saved:', savedImage);
    };

    const saveText = (poem) => {
        const savedText = poem
        const poemText = savedText.replace(/=/g, '<br>')
        setText(poemText)
        setFormSubmit(true)
        console.log('Text saved:', savedText)
    }
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/Profile`;
        navigate(path);
    }
    const finishStory = () => {
       handleAddScene()
       routeChange()
    }

    return (
        <div
            className="bg-image d-flex column justify-content-center align-items-center"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', minHeight: '100vh', fontSize: '32px' }}
        >
            <div className="mx-3 text-center mx-auto">
                <div style={{ backgroundColor: '#a00ffa', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }}>
                    <PhotoModal
                        photoArray={photoArray}
                        saveImage={saveImage}
                    />
                </div>
                <form
                    className="flex-row justify-center justify-space-between-md align-center"
                    onSubmit={handleFormSubmit}
                    style={{ backgroundColor: '#a00ffa', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }}
                >
                    <div>
                        <input
                            ref={textInputRef}
                            placeholder="choose text"
                            name="text"
                            className="form-input w-100"
                            style={{ textAlign: 'center' }}
                            maxLength={150} 
                        />
                    </div>
                </form>
                <div className="row"> 
                <PoetryOptions
                    poetryArray={poetryArray}
                    saveText={saveText}
                />
                </div>
                <div className="row">
                <button style={{ backgroundColor: '#a00ffa', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }} className='p-2' onClick={handleAddScene}>
                    Next Scene
                </button>
                <button style={{ backgroundColor: '#a00ffa', boxShadow: '0 0 10px #a903fc, 0 0 20px #a903fc', }} className='p-2' onClick={finishStory}>
                    Finish Story
                </button>
                {formSubmit && (
                    <div className="position-absolute bottom-0 end-0 p-3 text-white text-5xl"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            maxWidth: '33%',
                            width: 'auto',
                            maxHeight: '100vh',
                            overflowY: 'auto',
                            borderRadius: '10px',
                            margin: '10px',
                        }}>
                        <p style={{ fontSize: '32px', margin: 0 }} dangerouslySetInnerHTML={{ __html: sceneText }} />
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default DreamForge