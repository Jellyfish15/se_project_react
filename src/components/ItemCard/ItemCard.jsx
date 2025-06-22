import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = (item) => {
    onCardClick(item);
  };
  return (
    <div className="item-card" onClick={() => onCardClick(item)}>
      <li className="card">
        <h2 className="card__name" key={item._id}>
          {item.name}
        </h2>
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.link}
          alt={item.name}
        />
      </li>
    </div>
  );
}

export default ItemCard;
