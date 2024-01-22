import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, filter }) {
  const closeModal = useCallback(
    ({target, currentTarget, code}) => {
      if (code === 'Escape' || currentTarget === target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  const { largeImageURL, tags } = filter[0];

  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}
