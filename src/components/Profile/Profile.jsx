import "./Profile.css";
import SideBar from "./../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile ({ handleAddClick, clothingItems, onCardClick }) {
    return (
 <div className="profile">
    <section className="profile__sidebar">
        <SideBar />
    </section>
    <section className="profile__clothing-items">
        <ClothesSection  
        clothingItems={clothingItems} // pass all items here
          onCardClick={onCardClick}
          handleAddClick={handleAddClick} />
    </section>
  </div>
    );
}

export default Profile;