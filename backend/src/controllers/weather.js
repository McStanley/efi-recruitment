import fetchWeather from '../utils/fetchWeather.js';

const getWeather = async (ctx) => {
  const query = ctx.query.query;

  const data = await fetchWeather(query);

  ctx.type = 'application/json; charset=utf-8';
  ctx.response.status = data.cod;
  ctx.body = data;
};

export default getWeather;
