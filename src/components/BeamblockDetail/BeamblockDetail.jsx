import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './beamBlockDetail.css';
import { FaEdit } from 'react-icons/fa';

const BeamBlockDetail = () => {
  const { postId } = useParams();
  const [beamBlock, setBeamBlock] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({
    title: '',
    description: '',
    content: '',
    price: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeamBlock = async () => {
      try {
        const response = await fetch(`http://localhost:5000/beamblock/${postId}`);
        const data = await response.json();
        setBeamBlock(data);
        setEditDetails({
          title: data.title,
          description: data.description,
          content: data.content,
          price: data.price,
        });
      } catch (error) {
        setMessage('Error fetching BeamBlock: ' + (error.message || 'Unknown error'));
      }
    };

    fetchBeamBlock();
  }, [postId]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/beamblock/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editDetails),
      });
      const data = await response.json();
      setBeamBlock(data);
      setMessage('BeamBlock updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error updating BeamBlock: ' + (error.message || 'Unknown error'));
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className="beamblock-detail-container">
      {message && <p className="error-message">{message}</p>}
      {beamBlock ? (
        <>
          <div className='beamblock-content'>
            <img
              src={`http://localhost:5000/${beamBlock.image_url}`}
              alt={beamBlock.title}
              className='beamblock-image'
            />
            <div className='beamblock-details'>
              <h2>{beamBlock.title}</h2>
              <p>{beamBlock.content}</p>
              <p>{beamBlock.description}</p>
              <p className='beamblock-price'>Price: ${beamBlock.price}</p>
              <FaEdit
                className='edit-icon'
                onClick={() => setIsEditing(true)}
                title='Edit BeamBlock'
              />
            </div>
          </div>

          {isEditing && (
            <div className='edit-modal'>
              <div className='modal-content'>
                <span className='close' onClick={handleCloseModal}>
                  &times;
                </span>
                <form onSubmit={handleUpdate} className='edit-form'>
                  <input
                    type='text'
                    name='title'
                    value={editDetails.title}
                    onChange={handleEditChange}
                    placeholder='Title'
                    className='input-field'
                    required
                  />
                  <textarea
                    name='description'
                    value={editDetails.description}
                    onChange={handleEditChange}
                    placeholder='Description'
                    className='input-field'
                    required
                  />
                  <textarea
                    name='content'
                    value={editDetails.content}
                    onChange={handleEditChange}
                    placeholder='Content'
                    className='input-field'
                    required
                  />
                  <input
                    type='number'
                    name='price'
                    value={editDetails.price}
                    onChange={handleEditChange}
                    placeholder='Price'
                    className='input-field'
                    required
                  />
                  <button type='submit' className='submit-button'>Update</button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BeamBlockDetail;
