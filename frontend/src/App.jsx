import React, { useEffect, useState } from 'react';
import Icon from './components/Icon';
import getWeatherFromApi from './utils/getWeatherFromApi';

const initialCity = process.env.TARGET_CITY;

function App() {
  const [query, setQuery] = useState(initialCity);
  const [icon, setIcon] = useState('');
  const [main, setMain] = useState('');
  const [temperature, setTemperature] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchWeather = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await getWeatherFromApi(query);

      setIcon(data.weather[0].icon.slice(0, -1));
      setMain(data.weather[0].main);
      setTemperature(data.main.temp);
      setLocation(`${data.name}, ${data.sys.country}`);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchWeather();
  };

  return (
    <main className="card">
      {isLoading && <p className="loading">Loading...</p>}

      {!isLoading && (
        <>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="submit" type="submit">
              Submit
            </button>
          </form>

          {isError ? (
            <p className="error">Try a different location</p>
          ) : (
            <>
              {icon && <Icon icon={icon} text={main} />}
              <p className="temperature">
                {temperature}
                <span>° C</span>
              </p>
              <p className="notice">
                <span>Showing weather in </span>
                {location}
              </p>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default App;
