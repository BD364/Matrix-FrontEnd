import React, { useState } from 'react';
import axios from 'axios';
import './createPost.css'; 

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image_url: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/create/beamblock', postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Post created successfully:', response.data);
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
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
          type="text"
          name="image_url"
          value={postData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
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
    </div>
  );
};

export default CreatePost;
