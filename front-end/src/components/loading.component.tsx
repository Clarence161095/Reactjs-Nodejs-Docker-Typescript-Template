import React from 'react';
import util from '../core/utilities.core';
import '../styles/style.css';

const Loading = () => {
  return (
    <div className="loadingCmp">
      <img
        src={util.getGifOnGithub('loading')}
        alt="loading..."
        style={{ width: '300px', height: '300px' }}
      />
    </div>
  );
};

export default Loading;
