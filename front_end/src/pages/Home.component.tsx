import React, { useEffect, useState } from 'react';
import { LoadingCmp } from '../components/Material.component';
import MenuCmp from '../components/Menu.component';

const listMenu = [
  {
    name: 'Menu 1',
    link: '/menu_1',
  },
  {
    name: 'Menu 2',
    link: '/menu_2',
  },
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="relative p-2">
      {loading && <LoadingCmp />}

      <MenuCmp
        listMenu={listMenu}
        toggleMenu={toggleMenu}
        closeMenu={() => setToggleMenu(false)}
      />

      <i
        className="bi bi-sliders hover:text-xl hover:cursor-pointer"
        onClick={() => {
          setToggleMenu(!toggleMenu);
        }}
      ></i>
    </div>
  );
};

export default Home;
