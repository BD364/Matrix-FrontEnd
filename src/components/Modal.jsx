import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-lg relative'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 transition-colors'
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
