export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}
export const filterWeatherData = (data) => {
  const result = {};

  result.city = data.name;
  result.temp = { F: data.main.temp, C: (data.main.temp - 32) };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDaytime = isDaytime(data.sys, Date.now());

  return result;
};

const isDaytime = ({ sunrise, sunset }, now) => {
  return { sunrise, sunset } && (Date.now() / 1000) >= sunrise && (Date.now() / 1000) <= sunset;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return 'hot';
  } else if (temperature >= 66 && temperature < 86) {
    return 'warm';
  } else {
    return 'cold';
  }
};