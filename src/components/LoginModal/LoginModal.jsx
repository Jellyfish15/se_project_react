import React from "react";
import "../ModalWithForm/ModalWithForm.css";
import closeIcon from "../../assets/close_X.svg";

function LoginModal({
  onLogin,
  onClose,
  isOpen,
  onSwitchToRegister,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
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
          <h2 className="modal__title">Log In</h2>
          <label className="modal__label">
            Email
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
            Password
            <input
              className="modal__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="modal__buttons">
            <button
              className="modal__submit"
              type="submit"
              disabled={!email || !password}
            >
              Login
            </button>
            <button
              className="modal__register"
              type="button"
              onClick={onSwitchToRegister}
              disabled={!email || !password}
            >
              or Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
