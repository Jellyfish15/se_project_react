import "./ConfirmModal.css";
import closeIcon from "../../assets/close_X.svg";

function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className={`modal${isOpen ? " modal_opened" : ""}`} 
    onClick={onClose} id="confirm-modal">
      <div className="confirm-modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="confirm-modal__title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        
         
          <button
            className="modal__close-button"
            onClick={onClose}
            type="button"
          > <img
              className="confirm-modal__close-image"
              src={closeIcon}
              alt="Close modal"
            />
            </button>
          <div className="modal__actions">
             <button className="confirm-modal__submit" onClick={onConfirm}>
            Yes, delete item
          </button>
            <button className="modal__cancel" onClick={onClose} type="button">
              Cancel
            </button>
           
          
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
