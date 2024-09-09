import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../utils/Api'; 
import Footer from '../Footer/Footer';


const GalleryDetail = () => {
  const { galleryId } = useParams();
  const [gallery, setGallery] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({
    title: '',
    image_url: ''
  });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await Api.api.get(Api.END_POINTS.SINGLEGALLERY(galleryId));
        setGallery(data.gallery);
        setEditDetails({
          title: data.gallery.title,
          image_url: data.gallery.image_url
        });
      } catch (error) {
        setMessage('Error fetching gallery: ' + (error.message || 'Unknown error'));
      }
    };

    fetchGallery();
  }, [galleryId]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Api.api.put(
        Api.END_POINTS.UPDATEGALLERY(galleryId),
        editDetails
      );
      setGallery(data.gallery);
      setMessage('Gallery updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error updating gallery: ' + (error.message || 'Unknown error'));
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className='gallery-detail-container'>
      {message && <p className='error-message'>{message}</p>}
      {gallery ? (
        <>
          <div className='gallery-content'>
            <img
              src={`${Api.BASE_URL}/${gallery.image_url}`}
              alt={gallery.title}
              className='gallery-image'
            />
            <div className='gallery-details'>
              <h2>{gallery.title}</h2>
              <FaEdit
                className='edit-icon'
                onClick={() => setIsEditing(true)}
                title='Edit Gallery'
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
                  <input
                    type='text'
                    name='image_url'
                    value={editDetails.image_url}
                    onChange={handleEditChange}
                    placeholder='Image URL'
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

export default GalleryDetail;
