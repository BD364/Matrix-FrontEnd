import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from '../../utils/Api';
import { FaEdit } from 'react-icons/fa';

const PavingBlockDetail = () => {
  const { postId } = useParams();
  const [pavingBlock, setPavingBlock] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({
    title: '',
    description: '',
    price: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPavingBlock = async () => {
      try {
        const { data } = await Api.api.get(
          Api.END_POINTS.SINGLEPAVINGBLOCK(postId)
        );
        setPavingBlock(data);
        setEditDetails({
          title: data.title,
          description: data.description,
          price: data.price,
        });
      } catch (error) {
        setMessage(
          'Error fetching PavingBlock: ' + (error.message || 'Unknown error')
        );
      }
    };

    fetchPavingBlock();
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
      const { data } = await Api.api.put(
        Api.END_POINTS.UPDATEPAVINGBLOCK(postId),
        editDetails
      );
      setPavingBlock(data);
      setMessage('PavingBlock updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage(
        'Error updating PavingBlock: ' + (error.message || 'Unknown error')
      );
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className='pavingblock-detail-container'>
      {message && <p className='error-message'>{message}</p>}
      {pavingBlock ? (
        <>
          <div className='pavingblock-content'>
            <img
              src={`${Api.BASE_URL}/${pavingBlock.image_url}`}
              alt={pavingBlock.title}
              className='pavingblock-image'
            />
            <div className='pavingblock-details'>
              <h2>{pavingBlock.title}</h2>
              <p>{pavingBlock.description}</p>
              <p className='pavingblock-price'>Price: ${pavingBlock.price}</p>
              <FaEdit
                className='edit-icon'
                onClick={() => setIsEditing(true)}
                title='Edit PavingBlock'
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
                  <input
                    type='number'
                    name='price'
                    value={editDetails.price}
                    onChange={handleEditChange}
                    placeholder='Price'
                    className='input-field'
                    required
                  />
                  <button type='submit' className='submit-button'>
                    Update
                  </button>
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

export default PavingBlockDetail;
