import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './hollowBlockDetail.css';
import Api from '../../utils/Api';
import Footer from '../Footer/Footer';


const HollowBlockDetail = () => {
  const { postId } = useParams();
  const [hollowBlock, setHollowBlock] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({
    title: '',
    description: '',
    price: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHollowBlock = async () => {
      try {
        const { data } = await Api.api.get(
          Api.END_POINTS.SINGLEHOLLOWBLOCK(postId)
        );
        setHollowBlock(data);
        setEditDetails({
          title: data.title,
          description: data.description,
          price: data.price,
        });
      } catch (error) {
        setMessage(
          'Error fetching HollowBlock: ' + (error.message || 'Unknown error')
        );
      }
    };

    fetchHollowBlock();
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
        Api.END_POINTS.UPDATEHOLLOWBLOCK(postId),
        editDetails
      );
      setHollowBlock(data);
      setMessage('HollowBlock updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage(
        'Error updating HollowBlock: ' + (error.message || 'Unknown error')
      );
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className='hollowblock-detail-container'>
      {message && <p className='error-message'>{message}</p>}
      {hollowBlock ? (
        <>
          <div className='hollowblock-content'>
            <img
              src={`${Api.BASE_URL}/${hollowBlock.image_url}`}
              alt={hollowBlock.title}
              className='hollowblock-image'
            />
            <div className='hollowblock-details'>
              <h2>{hollowBlock.title}</h2>
              <p>{hollowBlock.description}</p>
              <p className='hollowblock-price'>Price: ${hollowBlock.price}</p>
              <FaEdit
                className='edit-icon'
                onClick={() => setIsEditing(true)}
                title='Edit HollowBlock'
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
      <Footer/>
    </div>
  );
};

export default HollowBlockDetail;
