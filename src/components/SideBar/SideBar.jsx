import "./SideBar.css";
import DefaultAvatar from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function SideBar({ onSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__avatar">
      <img
        className="sidebar__avatar-image"
        src={
          currentUser && currentUser.avatar ? currentUser.avatar : DefaultAvatar
        }
        alt="User avatar"
        width={56}
        height={56}
      />
      <p className="sidebar__username">
        {currentUser ? currentUser.name : "User name"}
      </p>
      </div>

      <button
        className="sidebar__edit-btn"
        onClick={onEditProfile}
        type="button"
      >
        Change Profile Data
      </button>
      <button
        className="sidebar__signout-btn"
        onClick={onSignOut}
        type="button"
      >
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
