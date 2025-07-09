import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useState } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });

    useEffect(() => {
      setName("");
      setImageUrl("");
      setWeather("");
    }, [isOpen]);
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend"> Select the weather type</legend>
        <div className="modal__radio-container">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input "
            name="weather_type"
            required
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />

          <label htmlFor="hot" className="modal__radio-label">
            {" "}
            Hot
          </label>
        </div>
        <div className="modal__radio-container">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather_type"
            required
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          <label htmlFor="warm" className="modal__radio-label">
            {" "}
            Warm
          </label>
        </div>
        <div className="modal__radio-container">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input "
            name="weather_type"
            required
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          <label htmlFor="cold" className="modal__radio-label">
            {" "}
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
