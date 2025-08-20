import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import likeBtn from "../../assets/like_btn.svg";
import likeBtnSelected from "../../assets/like_btn_selected.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;
  const [guestLiked, setGuestLiked] = useState(false);
  const isLiked = isLoggedIn
    ? item.likes && item.likes.some((id) => id === currentUser._id)
    : guestLiked;
  const itemLikeButtonClassName = `card__like-btn${
    isLiked ? " card__like-btn_active" : ""
  }`;

  const handleLike = (e) => {
    e.stopPropagation();
    if (onCardLike) {
      onCardLike({ id: item._id, isLiked });
    }
    if (!isLoggedIn) {
      setGuestLiked((prev) => !prev);
    }
  };

  return (
    <li className="card item-card" onClick={() => onCardClick(item)}>
      <div className="card__name-row">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={itemLikeButtonClassName}
          type="button"
          onClick={handleLike}
        >
          <img
            src={isLiked ? likeBtnSelected : likeBtn}
            alt={isLiked ? "Liked" : "Like"}
            className="card__like-img"
          />
        </button>
      </div>
      <img
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
