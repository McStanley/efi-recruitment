const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (query) => {
  try {
    const response = await fetch(`${baseURL}/weather?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return {};
};

export default getWeatherFromApi;
