import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './createPost.css';

const CreatePost = () => {
  const { token, api } = useAuth(); 
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    price: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !api) {
      setMessage('Authentication or API setup is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('price', postData.price);
    formData.append('description', postData.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await api.post('/create/beamblock', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Post created successfully! Redirecting to home page...');
      setTimeout(() => navigate('/'), 2000); 
    } catch (error) {
      setMessage('Error creating post: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          placeholder="Post Title"
          required
          className="input"
        />
        <textarea
          name="content"
          value={postData.content}
          onChange={handleChange}
          placeholder="Post Content"
          required
          className="textarea"
        />
        
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="input"
        />
        
        <input
          type="number"
          name="price"
          value={postData.price}
          onChange={handleChange}
          placeholder="Price"
          className="input"
          required
        />
        <textarea
          name="description"
          value={postData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea"
        />
        <button type="submit" className="submit-button">Create Post</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default CreatePost;
