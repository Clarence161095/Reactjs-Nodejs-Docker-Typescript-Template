/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './NotFound.scss';

NotFound.propTypes = {};

function NotFound() {
  return (
    <div className='not-found'>
      <div className='four_zero_four_bg'>
        <h1 className='text-center '>404</h1>
      </div>
      <div className='content_box_404'>
        <h3 className='h2'>Look like you're lost</h3>
        <p>the page you are looking for is not available!</p>
        <a
          href='#'
          className='link_404'
          onClick={() => (window.location.href = './dashboard')}>
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
