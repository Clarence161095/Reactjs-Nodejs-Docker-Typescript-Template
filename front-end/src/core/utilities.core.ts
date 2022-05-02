import _ from 'lodash';
import { toast } from 'react-toastify';
import DEFAULT_ENV from './default-env.core';

const getEnvParam = (name: string) => {
  return process.env[name] ? process.env[name] : DEFAULT_ENV[`${name}`];
};

const getGifOnGithub = (name: string) => {
  return `${getEnvParam('GIF_GITHUB_URL') + name}.gif`;
};

const getPokemonSpriteUrl = ({ id = 151, isBack = false }) => {
  if (isBack) {
    return `${getEnvParam('GIF_POKEMON_SPRITE_URL')}animated_24FPS/back/${id}.gif`;
  } else {
    return `${getEnvParam('GIF_POKEMON_SPRITE_URL')}animated_24FPS/${id}.gif`;
  }
};

const toastDebounce = _.debounce((message) => {
  toast(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}, 500);

const util = { getGifOnGithub, getPokemonSpriteUrl, toastDebounce };
export default util;
