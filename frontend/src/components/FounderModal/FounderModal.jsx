import React from 'react';
import './FounderModal.css';

export default function FounderModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close" onClick={onClose}>&times;</button>
        <h4><i className="fas fa-crown"></i> Founder Lifetime Access</h4>
        {/* TODO: replace below with your Stripe component later */}
        <p>Stripe placeholder component goes here.</p>
      </div>
    </div>
  );
}
