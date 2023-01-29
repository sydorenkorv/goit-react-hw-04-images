import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import css from './Modal.module.css';

export const Modal = ({ isOpen, onClose, selectedImage }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={event => event.stopPropagation()}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          X
        </button>
        {selectedImage && (
          <img
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            style={{ width: '100%' }}
          />
        )}
      </div>
    </div>,
    document.body
  );
};
