/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import util from '../core/utilities.core';
import '../styles/style.css';

const PokemonImage = (props: any) => {
  const pokemonId = useRef(_.random(1, 649));
  const isBack = useRef(false);
  const position = useRef({ x: _.random(-10, 110), y: _.random(-10, 110) });
  
  const calculatePosition = () => {
    if (position.current.x > 110) {
      position.current.x = 100;
    }
    if (position.current.y > 110) {
      position.current.y = 100;
    }
    if (position.current.x < -10) {
      position.current.x = 0;
    }
    if (position.current.y < -10) {
      position.current.y = 0;
    }
  };
  useEffect(() => {
    const a = _.random(1, 8);
    calculatePosition();
    switch (a) {
      case 1:
        position.current.x += _.random(1, 20) * 0;
        position.current.y += _.random(1, 20) * -1;
        isBack.current = true;
        break;
      case 2:
        position.current.x += _.random(1, 20) * 1;
        position.current.y += _.random(1, 20) * -1;
        isBack.current = true;
        break;
      case 3:
        position.current.x += _.random(1, 20) * 1;
        position.current.y += _.random(1, 20) * 0;
        isBack.current = true;
        break;
      case 4:
        position.current.x += _.random(1, 20) * 1;
        position.current.y += _.random(1, 20) * 1;
        isBack.current = false;
        break;
      case 5:
        position.current.x += _.random(1, 20) * 0;
        position.current.y += _.random(1, 20) * 1;
        isBack.current = false;
        break;
      case 6:
        position.current.x += _.random(1, 20) * -1;
        position.current.y += _.random(1, 20) * 1;
        isBack.current = false;
        break;
      case 7:
        position.current.x += _.random(1, 20) * -1;
        position.current.y += _.random(1, 20) * 0;
        isBack.current = false;
        break;
      case 8:
        position.current.x += _.random(1, 20) * -1;
        position.current.y += _.random(1, 20) * -1;
        isBack.current = false;
        break;
      default:
        break;
    }
  }, [props.position]);
  return (
    <div>
      <img
        className="pokemonBackgroundCmp-pokemonImg"
        src={util.getPokemonSpriteUrl({
          id: pokemonId.current,
          isBack: isBack.current,
        })}
        alt="Pokemon"
        style={{
          position: 'absolute',
          left: `${position.current.x}%`,
          top: `${position.current.y}%`,
          transition: 'all 3s linear',
          width: 'auto',
        }}
      />
    </div>
  );
};

const PokemonBackground = (props: any) => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setPosition(_.random(1, 10000));
    }, 2000);
  }, []);

  return (
    <div className="pokemonBackgroundCmp">
      {_.times(props.pokemonNumber, Number).map((key) => {
        return <PokemonImage key={key} position={position} />;
      })}
    </div>
  );
};

export default PokemonBackground;
