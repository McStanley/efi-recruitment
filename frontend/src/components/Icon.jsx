import React from 'react';
import PropTypes from 'prop-types';

function Icon({ icon, text }) {
  return (
    <img src={`/img/${icon}.svg`} alt={text} />
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Icon;
