import React from 'react';
import images from '../../assets/image';

function NotFound() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={images.notFoundGif} alt="gif" />
    </div>
  );
}

export default NotFound;
