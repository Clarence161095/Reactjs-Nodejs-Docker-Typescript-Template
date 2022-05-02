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
    <div className="menuCmp">
      <ul style={toggleMenu ? styles.show : styles.hidden}>
        <li key={'close'}>
          <p>MENU</p>
          <i
            className="bi bi-x-circle"
            onClick={() => {
              setToggleMenu(false);
              props.closeMenu();
            }}
          ></i>
        </li>
        {props.listMenu.map((item: any) => {
          return (
            <li
              key={item}
              onClick={() => {
                navigate(item.link);
              }}
            >
              {item.name}
            </li>
          );
        })}
        <li key={'Logout'} onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default MenuCmp;
