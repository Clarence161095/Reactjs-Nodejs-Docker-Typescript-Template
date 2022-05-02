/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import CONSTANT from './core/constant.core';
import PokemonBackground from './pages/PokemonBackground.component';
import RootRouter from './routers/Root.router';

function App() {
  return (
    <div className="relative flex flex-col min-h-screen text-white px-2 z-50 bg-[#192a56]">
      <PokemonBackground pokemonNumber={CONSTANT.POKEMON_NUMBER_IN_BACKGROUND} />
      <RootRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
