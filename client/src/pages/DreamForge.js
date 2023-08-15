import React, { useState } from 'react'
import { CREATE_SCENE } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import { Link, Navigate, useParams } from 'react-router-dom'
import Modal from 'react-modal'

// Import the list of image filenames from the assets folder
// import { photoArray } from '../assets'



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
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);
    let subtitle
    const [modalIsOpen, setIsOpen] = React.useState(false)
    const photos = [
        'https://picsum.photos/id/10/200/300',
        'https://picsum.photos/id/11/200/300',
        'https://picsum.photos/id/13/200/300',
        'https://picsum.photos/id/22/200/300',
        'https://picsum.photos/id/25/200/300',
        'https://picsum.photos/id/29/200/300',
        'https://picsum.photos/id/38/200/300',
        'https://picsum.photos/id/41/200/300',
        'https://picsum.photos/id/43/200/300',
        'https://picsum.photos/id/58/200/300',
        'https://picsum.photos/id/98/200/300',
        'https://picsum.photos/id/102/200/300',
        'https://picsum.photos/id/154/200/300',
        'https://picsum.photos/id/159/200/300',
        'https://picsum.photos/id/184/200/300',
        'https://picsum.photos/id/225/200/300',
        'https://picsum.photos/id/260/200/300',
    ]

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
    }

    const handleAddScene = async () => {
        createScene({
            variables: {
                storyId: '64dbc68a7053b505b702f085',
                imagePath: bgImage,
                text: sceneText
            }
        })
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

    // const saveImage = () => {
    //     // save the currently set background image (bgImage) to a variable for later use
    //     const savedImage = bgImage;
    //     console.log('Image saved:', savedImage);
    // };

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
                            {(photos).map((photo) => (
                                <img key={photo._id} src={photo} className="card mb-3 d-flex col-2" />

                            ))}
                        </div>
                        <input />
                    </form>
                </Modal>


            </div>
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