import { useState } from "react";
import "./Modal.css";

function Modal({ isOpen, closable, onClose, children }) {
  const [closing, setClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (!closable) return;
    
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  };

  return (
    <div
      className={`modal-overlay ${closing ? "closing" : ""}`}
    >
      <div
        className={`modal-content ${closing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={handleClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
