import "./Profile.css";
import SideBar from "./../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleAddClick, clothingItems, onCardClick, onSignOut }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onSignOut={onSignOut} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
