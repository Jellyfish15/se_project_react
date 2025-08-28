import "./Profile.css";
import SideBar from "./../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleAddClick,
  clothingItems,
  onCardClick,
  onSignOut,
  onEditProfile,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
