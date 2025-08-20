import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import avatar_alt from "../../assets/alt-avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header(props) {
  const { handleAddClick, weatherData, onLoginClick, onRegisterClick } = props;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="Logo" src={logo} />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__actions">
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
        )}
      </div>
      {isLoggedIn ? (
        <Link to="/profile" className="header__user-link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="User avatar"
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar header__avatar--placeholder">
                {currentUser.name
                  ? currentUser.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}
          </div>
        </Link>
      ) : (
        <div className="header__user-link">
          <button className="header__login-btn" onClick={onLoginClick}>
            Log In
          </button>
          <button className="header__register-btn" onClick={onRegisterClick}>
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
