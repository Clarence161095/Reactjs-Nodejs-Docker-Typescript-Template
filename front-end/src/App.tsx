/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Constant from './core/constant.core';
import PokemonBackground from './pages/PokemonBackground.component';
import RootRouter from './Routers/Root.router';
import './styles/style.css';

function App() {
  return (
    <div className="appCmp">
      <PokemonBackground pokemonNumber={Constant.POKEMON_NUMBER} />

      <div className="appCmp-title">Website học từ vựng bằng Flashcard</div>

      <RootRouter />

      <ToastContainer />
    </div>
  );
}

export default App;
