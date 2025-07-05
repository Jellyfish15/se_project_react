
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";

function ClothesSection({ onCardClick, handleAddClick }) {
    
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__header-text">Your items</p>
        <button 
         onClick={handleAddClick}
        type="button"
        className="clothes-section__button">+ Add New</button>
      </div>
      <ul className="clothes-section__list">
          {defaultClothingItems
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}

                 />
              );
            })}
        </ul>
    </div>
  );
}

export default ClothesSection;
