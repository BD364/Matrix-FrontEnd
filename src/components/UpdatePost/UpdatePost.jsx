import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './updatePost.css';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image_url: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/beamblock/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            timeout: 5000,
          }
        );
        setPostData(response.data);
      } catch (error) {
        console.error(
          'Error fetching post:',
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchPost();
  }, [postId]);

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
      const response = await axios.put(
        `http://localhost:5000/update/beamblock/${postId}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.error(
        'Error updating post:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className='update-post-container'>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          value={postData.title}
          onChange={handleChange}
          placeholder='Post Title'
          required
          className='input'
        />
        <textarea
          name='content'
          value={postData.content}
          onChange={handleChange}
          placeholder='Post Content'
          required
          className='textarea'
        />
        <input
          type='text'
          name='image_url'
          value={postData.image_url}
          onChange={handleChange}
          placeholder='Image URL'
          className='input'
        />
        <input
          type='number'
          name='price'
          value={postData.price}
          onChange={handleChange}
          placeholder='Price'
          required
          className='input'
        />
        <textarea
          name='description'
          value={postData.description}
          onChange={handleChange}
          placeholder='Description'
          className='textarea'
        />
        <button type='submit' className='submit-button'>
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
