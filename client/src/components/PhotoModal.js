import React from 'react';
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

function PhotoModal({photoArray, saveImage}) {
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
return(

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
)}

export default PhotoModal