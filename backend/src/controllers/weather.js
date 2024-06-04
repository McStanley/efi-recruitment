import fetchWeather from '../utils/fetchWeather.js';

const getWeather = async (ctx) => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
};

export default getWeather;
