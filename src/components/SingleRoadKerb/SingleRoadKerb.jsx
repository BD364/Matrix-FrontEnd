import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../utils/Api';
import Footer from '../Footer/Footer';


const RoadKerbDetail = () => {
  const { postId } = useParams();
  const [roadKerb, setRoadKerb] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({
    title: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    const fetchRoadKerb = async () => {
      try {
        const { data } = await Api.api.get(
          Api.END_POINTS.SINGLEROADKERB(postId)
        );
        setRoadKerb(data);
        setEditDetails({
          title: data.title,
          description: data.description,
          price: data.price,
        });
      } catch (error) {
        setMessage(
          'Error fetching Road Kerb: ' + (error.message || 'Unknown error')
        );
      }
    };

    fetchRoadKerb();
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
        Api.END_POINTS.UPDATEROADKERB(postId),
        editDetails
      );
      setRoadKerb(data);
      setMessage('Road Kerb updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage(
        'Error updating Road Kerb: ' + (error.message || 'Unknown error')
      );
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className='roadkerb-detail-container'>
      {message && <p className='error-message'>{message}</p>}
      {roadKerb ? (
        <>
          <div className='roadkerb-content'>
            <img
              src={`${Api.BASE_URL}/${roadKerb.image_url}`}
              alt={roadKerb.title}
              className='roadkerb-image'
            />
            <div className='roadkerb-details'>
              <h2>{roadKerb.title}</h2>
              <p>{roadKerb.description}</p>
              <p className='roadkerb-price'>Price: ${roadKerb.price}</p>
              <FaEdit
                className='edit-icon'
                onClick={() => setIsEditing(true)}
                title='Edit Road Kerb'
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

export default RoadKerbDetail;
