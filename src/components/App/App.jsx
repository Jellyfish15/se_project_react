import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import { filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/footer.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 75, C: 24 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  console.log(456);
  console.log(weatherData);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log(132);
        console.log(filteredData);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
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
            />
            <label htmlFor="cold" className="modal__radio-label">
              {" "}
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
