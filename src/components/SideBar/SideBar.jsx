import "./SideBar.css";
import DefaultAvatar from "../../assets/avatar.svg";

function SideBar () {
    return (
 <div className="sidebar">
    <img className="sidebar__avatar" src= {DefaultAvatar} alt="Default avatar" />
    <p className="sidebar__username">User name</p>
  </div>
  );
}

export default SideBar;