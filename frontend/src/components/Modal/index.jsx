import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isActive, onClose, title, children, footer }) => {
  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button 
            className="delete" 
            aria-label="close" 
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          {children}
        </section>
        {footer && (
          <footer className="modal-card-foot">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node
};

export default Modal;