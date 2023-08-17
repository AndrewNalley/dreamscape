import React, { useState, useRef } from 'react'
import { CREATE_SCENE } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import { Link, Navigate, useParams } from 'react-router-dom'
import Modal from 'react-modal'
import PoetryAPI from '../utils/API/poetryAPI'
// Import the list of image filenames from the assets folder
import { photoArray } from '../assets'

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
 
    const [createScene] = useMutation(CREATE_SCENE)
    const [bgImage, setImage] = useState('')
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
            const formattedText = textValue.replace(/-/g, '<br>');
            setText(formattedText);
            setFormSubmit(true)
        }
        // setCurrentImageIndex(0);
        textInputRef.current.value =''
    }
    const { storyId } = useParams()
    const handleAddScene = async () => {
        createScene({
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

    // const changeBackgroundImage = (index) => {
    //     setImage(photoArray[index]);
    //     setCurrentImageIndex(index);
    // };

    // const navigateImages = (increment) => {
    //     const newIndex = (currentImageIndex + increment + photoArray.length) % photoArray.length;
    //     changeBackgroundImage(newIndex);
    // };

    const saveImage = (p) => {
        // save the currently set background image (bgImage) to a variable for later use
        const savedImage = p.url;
        setImage(savedImage)
        console.log('Image saved:', savedImage);
    };

    return (
        <div
            className="bg-image" // You can create a CSS class named 'bg-image' for styling
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', minHeight: '100vh' }}
        >
            {/* <form
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
            </form> */}
            <div>
                <button onClick={openModal}> Set Scene Image </button>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Image Selection Modal'>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                     <button onClick={closeModal}>close</button>
                <div>Select an image for your scene.</div>
                <form>
                <div className='d-flex row align-items-center'>
                {(photoArray).map((photo) => (
                <img onClick={() => saveImage(photo)} key={photo.id} src={photo.url} className="card mb-3 d-flex col-2" />
                  
                ))}
            </div>
            
            </form>
                </Modal>


            </div>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9">
                    <input
                        ref={textInputRef}
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
            <PoetryAPI />
            <div className='align-end justify-end'>Finish Story</div>
            <button onClick={handleAddScene}>
                Next Scene
            </button>
            <button onClick=''>
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
    )
}

export default DreamForge