import "./SideBar.css";
import DefaultAvatar from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function SideBar({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={
          currentUser && currentUser.avatar ? currentUser.avatar : DefaultAvatar
        }
        alt="User avatar"
      />
      <p className="sidebar__username">
        {currentUser ? currentUser.name : "User name"}
      </p>
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
