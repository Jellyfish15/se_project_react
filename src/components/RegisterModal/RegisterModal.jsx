import React from "react";
import "../ModalWithForm/ModalWithForm.css";
import closeIcon from "../../assets/close_X.svg";
import "./RegisterModal.css";

function RegisterModal({
  onRegister,
  onClose,
  isOpen,
  onSwitchToLogin,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  avatar,
  setAvatar,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name, avatar });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal${isOpen ? " modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-button" onClick={onClose} type="button">
          <img
            className="modal__close-image"
            src={closeIcon}
            alt="Close modal"
          />
        </button>

        <form
          onSubmit={handleSubmit}
          className="modal__form"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="modal__title">Sign Up</h2>
          <label className="modal__label">
            Email*
            <input
              className="modal__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="modal__label">
            Password*
            <input
              className="modal__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="modal__label">
            Name
            <input
              className="modal__input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="modal__label">
            Avatar URL
            <input
              className="modal__input"
              type="url"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>
          <div className="modal__buttons">
            <button
              className="modal__submit"
              type="submit"
              disabled={!email || !password || !name}
            >
              Next
            </button>
            <button
              className="modal__register"
              type="button"
              onClick={onSwitchToLogin}
              disabled={!email || !password || !name}
            >
              or Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
