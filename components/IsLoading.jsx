import React from 'react';
import PropTypes from 'prop-types';

function IsLoading({ message }) {
  return <p className='text-lg font-bold text-gray-800'>{message ? message : 'Loading...'}</p>;
}

IsLoading.propTypes = {
  message: PropTypes.string,
};

IsLoading.defaultProps = {
  message: null,
};

export default IsLoading;
