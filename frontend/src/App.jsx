import React, { useEffect, useState } from 'react';
import Icon from './components/Icon';
import getWeatherFromApi from './utils/getWeatherFromApi';

function App() {
  const [icon, setIcon] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      const weather = await getWeatherFromApi();

      setIcon(weather.icon.slice(0, -1));
      setText(weather.main);
    })();
  }, []);

  return (
    <div className="icon">
      {icon && <Icon icon={icon} text={text} />}
    </div>
  );
}

export default App;
