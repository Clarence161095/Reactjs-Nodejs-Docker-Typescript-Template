import IMAGES from 'constants/images';
import React from 'react';
import './NotFound.scss';

function NotFound() {
  const not_found_gif = IMAGES.NOT_FOUND_GIF;

  return (
    <div className='not-found'>
      <div className='four_zero_four_bg' style={{backgroundImage: `url(${not_found_gif})`}}>
        <h1 className='text-center'>404</h1>
      </div>
      <div className='content_box_404'>
        <h3 className='h2'>Look like you're lost</h3>
        <p>the page you are looking for is not available!</p>
        <button
          className='link_404'
          onClick={() => (window.location.href = '/dashboard')}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
