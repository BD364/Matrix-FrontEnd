import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import './updatePost.css';

const UpdatePost = () => {
  const { postId } = useParams();
  const { api, token } = useAuth();
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image_url: '',
    price: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/beamblock/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPostData(response.data);
      } catch (error) {
        console.error(
          'Error fetching post:',
          error.response ? error.response.data : error.message
        );
        setMessage('Error fetching post.');
      }
    };

    fetchPost();
  }, [postId, api, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('price', postData.price);
    formData.append('description', postData.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await api.put(`/update/beamblock/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setPostData(response.data.beamblock);
      setMessage('Post updated successfully! Redirecting to home page...');
      setTimeout(() => navigate('/beamblocks'), 2000);
    } catch (error) {
      setMessage(
        'Error updating post: ' +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <div className='update-post-container'>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className='form-group'>
          <input
            type='text'
            name='title'
            value={postData.title || ''}
            onChange={handleChange}
            placeholder='Post Title'
            required
            className='input'
          />
        </div>
        <div className='form-group'>
          <textarea
            name='content'
            value={postData.content || ''}
            onChange={handleChange}
            placeholder='Post Content'
            required
            className='textarea'
          />
        </div>
        <div className='form-group file-input-wrapper'>
          <input
            type='file'
            name='image'
            onChange={handleFileChange}
            id='file-upload'
          />
          <label htmlFor='file-upload'>Choose file</label>
        </div>
        <div className='form-group'>
          <input
            type='number'
            name='price'
            value={postData.price || ''}
            onChange={handleChange}
            placeholder='Price'
            required
            className='input'
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            value={postData.description || ''}
            onChange={handleChange}
            placeholder='Description'
            className='textarea'
          />
        </div>
        <button type='submit' className='submit-button'>
          Update Post
        </button>
      </form>
      {postData.image_url && (
        <div className='image-container'>
          <h3>Current Image:</h3>
          <img
            src={`http://localhost:5000/static${postData.image_url}`}
            alt='Current Post'
            className='post-image'
          />
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
