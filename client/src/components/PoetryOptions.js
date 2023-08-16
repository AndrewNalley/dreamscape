import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import Modal from 'react-modal'
// import poetryArray from '../assets/poems'

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

function PoetryOptions({poetryArray, saveText}) {
  // const [sceneText, setText] = useState('')
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
    // const saveText = (poem) => {
    //   const savedText = poem
    //   setText(savedText)
    //   console.log('Text saved:', savedText)
    //   console.log(sceneText)
    // }
 
  return (
    <>
        <button onClick={openModal}> Select Poem </button>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Image Selection Modal'>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                     <button onClick={closeModal}>close</button>
                <div>Select a poem for your scene.</div>
                <form>
                <div className='d-flex row align-items-center'>
                {(poetryArray).map((poem) => (
                <Button onClick={() => saveText(poem.lines)} key={poem.id} className="card mb-3 d-flex col-4">{poem.title}</Button>
                  
                ))}
            </div>
            
            </form>
                </Modal>
    </>
  )
}

export default PoetryOptions;
