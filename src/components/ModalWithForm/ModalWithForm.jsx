import "./ModalWithForm.css";
import closeIcon from "../../assets/close_X.svg";
import React, { useEffect } from "react";

function ModalWithForm({ children, buttonText, title, onClose, isOpen }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <div
      id="modal-with-form"
      className={`modal${isOpen ? " modal_opened" : ""}`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close-button">
          <img
            className="modal__close-image"
            src={closeIcon}
            alt="Close modal"
          />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

// STATEMENT ? IF TRUE : IF FALSE
