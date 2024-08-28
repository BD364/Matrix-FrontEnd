import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './beamblocksList.css';
import { useAuth } from '../../AuthContext';
import { FaEdit } from 'react-icons/fa';

const BeamBlockList = () => {
  const [beamBlocks, setBeamBlocks] = useState([]);
  const [selectedBeamBlock, setSelectedBeamBlock] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBeamBlocks = async () => {
      try {
        const response = await fetch('http://localhost:5000/beamblocks');
        const data = await response.json();
        setBeamBlocks(data.beamblocks);
      } catch (error) {
        setMessage(
          'Error fetching beamblocks: ' + (error.message || 'Unknown error')
        );
      }
    };

    fetchBeamBlocks();
  }, []);

  const handleImageClick = (beamBlock) => {
    setSelectedBeamBlock(beamBlock);
  };

  const handleCloseModal = () => {
    setSelectedBeamBlock(null);
  };

  const handleEditClick = (id) => {
    navigate(`/update/${id}`); 
  };

  return (
    <div className='beamblock-list-container'>
      <h2 className='beamblock-list-title'>Available BeamBlocks</h2>
      {message && <p className='error-message'>{message}</p>}
      <div className='beamblock-grid'>
        {beamBlocks.length > 0 ? (
          beamBlocks.map((beamBlock) => (
            <img
              key={beamBlock.id}
              src={`http://localhost:5000/${beamBlock.image_url}`}
              alt={beamBlock.title}
              className='beamblock-image'
              onClick={() => handleImageClick(beamBlock)}
            />
          ))
        ) : (
          <p className='no-data-message'>No BeamBlocks available</p>
        )}
      </div>

      {selectedBeamBlock && (
        <div className='beamblock-modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseModal}>
              &times;
            </span>
            <FaEdit
              className='edit-icon'
              onClick={() => handleEditClick(selectedBeamBlock.id)} 
              title='Edit BeamBlock'
            />
            <div className='modal-body'>
              <img
                src={`http://localhost:5000/${selectedBeamBlock.image_url}`}
                alt={selectedBeamBlock.title}
                className='modal-image'
              />
              <div className='modal-details'>
                <h2>{selectedBeamBlock.title}</h2>
                <p>{selectedBeamBlock.content}</p>
                <p>{selectedBeamBlock.description}</p>
                <p className='modal-price'>Price: ${selectedBeamBlock.price}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeamBlockList;
