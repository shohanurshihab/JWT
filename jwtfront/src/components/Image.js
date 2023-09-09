import React from 'react';

const Image = ({ imageData }) => {
  return <img src={`data:image/png;base64,${imageData}`} alt="image" width='200px' />;
  
};

export default Image;
