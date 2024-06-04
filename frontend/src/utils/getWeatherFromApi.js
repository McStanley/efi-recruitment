const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return {};
};

export default getWeatherFromApi;
