import React from 'react';
import util from '../core/utilities.core';
import '../styles/style.css';

const LoadingPage = () => {
  return (
    <div className="loadingPageCmp">
      <img src={util.getGifOnGithub('loading')} alt="loading..." />
    </div>
  );
};

export default LoadingPage;
