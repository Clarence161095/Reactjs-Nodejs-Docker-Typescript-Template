/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import MenuCmp from './components/Menu.component';
import CONSTANT from './core/constant.core';
import { useCheckRole } from './hooks/checkRole.hook';
import { useLoggedHook } from './hooks/logged.hook';
import PokemonBackground from './pages/common/PokemonBackground.component';
import RootRouter from './routers/Root.router';
import { DEFAULT_LOGGED_STATE } from './states/login.state';

const OutSideSetting = (listSettingProps: any) => {
  const isShow = useRef(listSettingProps.backGroundPokemon);

  return [
    {
      name: 'ON/OFF Background',
      onClick: (_props: any) => {
        listSettingProps.setBackGroundPokemon(() => {
          isShow.current = !isShow.current;
          return isShow.current;
        });
        _props.closeMenu();
      },
    },
  ];
};

function App() {
  const [backGroundPokemon, setBackGroundPokemon] = useState(false);
  const [_, setLoggedState] = useLoggedHook();
  const [checkRole] = useCheckRole();

  const [setting, setSetting] = useState({
    isOpen: false,
    OutSideSetting: OutSideSetting({
      setBackGroundPokemon,
    }),
  });

  return (
    <div className="relative flex flex-col min-h-screen text-white px-2 z-50 bg-[#192a56]">
      <div className="flex flex-row justify-end">
        <i
          className="absolute bi bi-gear p-[9px] text-2xl hover:scale-[1.3]
                hover:cursor-pointer"
          onClick={() => setSetting({ ...setting, isOpen: !setting.isOpen })}
        ></i>
      </div>

      <MenuCmp
        listMenu={[
          ...setting.OutSideSetting,
          checkRole('general')
            ? {
                name: 'Logout',
                onClick: () => {
                  setLoggedState(DEFAULT_LOGGED_STATE);
                  localStorage.clear();
                  window.location.reload();
                },
              }
            : {},
        ]}
        closeMenu={() => setSetting({ ...setting, isOpen: false })}
        toggleMenu={setting.isOpen}
      />

      {backGroundPokemon && (
        <PokemonBackground
          pokemonNumber={CONSTANT.POKEMON_BACKGROUND.POKEMON_NUMBER_IN_BACKGROUND}
        />
      )}

      <RootRouter />

      <ToastContainer />
    </div>
  );
}

export default App;
