/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { DEFAULT_LOGGED_STATE, loggedGlobalState } from '../states/login.state';

function MenuCmp(props: any) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const setLoggedState = useSetRecoilState(loggedGlobalState);

  let navigate = useNavigate();

  const escFunction = useCallback((event: any) => {
    if (event.key === 'Escape') {
      setToggleMenu(false);
      props.closeMenu();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  useEffect(() => {
    setToggleMenu(props.toggleMenu);
  }, [props.toggleMenu]);

  const styles = {
    show: {},
    hidden: {
      opacity: '0.001',
      transform: 'scale(0.1) rotate(180deg) translate(0%, 1000%)',
    },
  };

  const handleLogout = () => {
    navigate('/login');
    setLoggedState(DEFAULT_LOGGED_STATE);
    localStorage.clear();
  };

  return (
    <div className="absolute">
      <ul
        className="fixed left-[50%] translate-x-[-50%] top-[25%]
          w-[95%] max-w-md min-w-[300px]
          p-5 rounded-md bg-[#8e44ad]
          text-lg text-center list-none
          flex flex-col justify-center items-center
          transition-all duration-300"
        style={toggleMenu ? styles.show : styles.hidden}
      >
        <li
          key={'close'}
          className="flex flex-row justify-between text-2xl mb-2 w-full"
        >
          <p className="menuTitle text-4xl">MENU</p>
          <i
            className="bi bi-x-circle translate-y-[-20%] 
              absolute
              hover:cursor-pointer
              hover:scale-125 transition-all right-4"
            onClick={() => {
              setToggleMenu(false);
              props.closeMenu();
            }}
          ></i>
        </li>

        {props.listMenu.map((item: any) => {
          return (
            <li
              className="border-[1px] border-solid w-full border-b-0 text-2xl
                hover:bg-[#27ae60] hover:cursor-pointer hover:scale-105 transition-all"
              key={JSON.stringify(item)}
              onClick={() => {
                navigate(item.link);
              }}
            >
              {item.name}
            </li>
          );
        })}

        <li
          className="border-[1px] border-solid w-full text-2xl
            hover:bg-[#27ae60] hover:cursor-pointer hover:scale-105 transition-all"
          key={'Logout'}
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default MenuCmp;
