import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import { register, login, checkToken } from "../../utils/auth.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { getWeather } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import { filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import Profile from "../Profile/Profile.jsx";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";

const handleCardLike = ({ id, isLiked }) => {
  const token = localStorage.getItem("jwt");
  if (!isLiked) {
    addCardLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  } else {
    removeCardLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  }
};

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 75, C: 24 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerAvatar, setRegisterAvatar] = useState("");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(itemToDelete._id, token)
      .then(() => {
        console.log("Item deleted successfully");
        setClothingItems((prev) =>
          prev.filter((i) => i._id !== itemToDelete._id)
        );
        setIsConfirmOpen(false);
        setItemToDelete(null);
        closeActiveModal("");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setRegisterError("");
    setLoginError("");
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    register({ email, password, name, avatar })
      .then((res) => {
        return login({ email, password });
      })
      .then((userData) => {
        setUser(userData);
        setIsAuthorized(true);
        setIsLoggedIn(true);
        closeActiveModal();
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterName("");
        setRegisterAvatar("");
      })
      .catch((err) => {
        setRegisterError("Registration failed. Try again.");
      });
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsAuthorized(true);
          setIsLoggedIn(true);
          navigate("/profile");
        }
        setUser(res);
        closeActiveModal();
        setLoginEmail("");
        setLoginPassword("");
      })
      .catch((err) => {
        setLoginError("Login failed. Check credentials.");
      });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log(filteredData);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setUser(userData);
          setIsAuthorized(true);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsAuthorized(false);
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem("jwt");
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    getItems()
      .then(({ data }) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setIsAuthorized(false);
    setUser(null);
    navigate("/");
  };

  const handleSwitchToRegister = () => {
    setRegisterEmail(loginEmail);
    setRegisterPassword(loginPassword);
    setActiveModal("");
    setTimeout(() => setActiveModal("register"), 0);
  };

  const handleSwitchToLogin = () => {
    setLoginEmail(registerEmail);
    setLoginPassword(registerPassword);
    setActiveModal("");
    setTimeout(() => setActiveModal("login"), 0);
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    CurrentTemperatureUnit={currentTemperatureUnit}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthorized={isAuthorized}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <RegisterModal
            onRegister={() =>
              handleRegister({
                email: registerEmail,
                password: registerPassword,
                name: registerName,
                avatar: registerAvatar,
              })
            }
            onClose={closeActiveModal}
            isOpen={activeModal === "register"}
            onSwitchToLogin={handleSwitchToLogin}
            email={registerEmail}
            setEmail={setRegisterEmail}
            password={registerPassword}
            setPassword={setRegisterPassword}
            name={registerName}
            setName={setRegisterName}
            avatar={registerAvatar}
            setAvatar={setRegisterAvatar}
          />
          <LoginModal
            onLogin={handleLogin}
            onClose={closeActiveModal}
            isOpen={activeModal === "login"}
            onSwitchToRegister={handleSwitchToRegister}
            email={loginEmail}
            setEmail={setLoginEmail}
            password={loginPassword}
            setPassword={setLoginPassword}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteClick}
            onCardLike={handleCardLike}
          />
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
            message="Are you sure you want to delete this item?"
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
