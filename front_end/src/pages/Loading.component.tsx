import React from 'react';
import util from '../core/utilities.core';

const Loading = () => {
  return (
    <div
      className="fixed top-0 left-0 overflow-hidden min-w-[100vw] max-w-[100]
        min-h-screen max-h-screen w-screen h-screen flex flex-row justify-center 
        items-center bg-[#71809355] z-[1000]"
    >
      <img src={util.getGifOnGithub('loading')} alt="loading..." />
    </div>
  );
};

export default Loading;
