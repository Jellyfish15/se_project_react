import "./ItemModal.css";
import closeIcon from "../../assets/close_X_light.svg";
import React, { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === (currentUser && currentUser._id);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      id="item-modal"
      className={`modal${activeModal === "preview" ? " modal_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close-button" onClick={onClose} type="button">
          <img
            className="modal__close-image"
            src={closeIcon}
            alt="Close modal"
          />
        </button>
        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__weather-info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className="item-modal__delete-btn"
              type="button"
              onClick={() => onDelete(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
