import fetch from 'node-fetch';

const appId = process.env.APPID || '';
const mapURI =
  process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

const fetchWeather = async (query) => {
  const endpoint = `${mapURI}/weather?q=${query}&appid=${appId}&units=metric`;
  const response = await fetch(endpoint);

  return response.json();
};

export default fetchWeather;
