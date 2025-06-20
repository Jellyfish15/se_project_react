import sunny from '../../assets/day/clear.png';
import "./WeatherCard.css";
import { weatherCardOptions } from '../../utils/constants';

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherCardOptions.filter((option) => {
    return (
      option.condition === weatherData.condition &&
      option.day === weatherData.isDay
    );
  });
  const defaultWeatherOptions = {
    day: weatherCardOptions.filter((option) => option.isDaytime),
    night: weatherCardOptions.filter((option) => !option.isDaytime),
  };

  let weatherOption;


  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? 'day' : 'night'][0];
  } else {
    weatherOption = filteredOptions[0];
  }



  return (
    <section className="weather-card">
      <p className="weather-card__temp">{Math.ceil(weatherData.temp.F)} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? 'Day' : 'Night'}time
        ${weatherOption?.condition}. weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;