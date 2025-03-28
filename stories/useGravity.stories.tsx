import React, { useState, FC } from 'react';

import { useGravity } from '../src';

import Button from './components/Button';
import Toggle from './components/Toggle';

import './index.css';

export default {
  title: 'Gravity',
};

interface Config {
  moverMass: number;
  attractorMass: number;
  r: number;
  repeatType: 'mirror' | 'loop';
}

export const GravityBasic = ({ moverMass, attractorMass, r }: Config) => {
  const [props] = useGravity<HTMLDivElement>({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      moverMass,
      attractorMass,
      r,
    },
  });

  return <div className="mover mover--purple" {...props} />;
};

GravityBasic.args = {
  moverMass: 10000,
  attractorMass: 1000000000000,
  r: 10
}

export const GravityControlled = ({ moverMass, attractorMass, r }: Config) => {
  const [toggle, setToggle] = useState<boolean>(true);

  const [props] = useGravity<HTMLDivElement>({
    from: {
      opacity: toggle ? 0 : 1,
      transform: toggle ? 'scale(0) rotate(0deg)' : 'scale(1) rotate(180deg)',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'scale(1) rotate(180deg)' : 'scale(0) rotate(0deg)',
    },
    config: {
      moverMass,
      attractorMass,
      r,
    },
  });

  return (
    <>
      <Toggle
        on={toggle}
        onChange={() => {
          setToggle((prevToggle) => !prevToggle);
        }}
      />
      <div className="mover mover--yellow" {...props} />
    </>
  );
};

GravityControlled.args = {
  moverMass: 10000,
  attractorMass: 1000000000000,
  r: 10
}

export const GravityEventBased = ({ moverMass, attractorMass, r }: Config) => {
  const [props, controller] = useGravity<HTMLDivElement>({
    from: { transform: 'skewY(0deg)' },
    to: { transform: 'skewY(30deg)' },
    config: {
      moverMass,
      attractorMass,
      r,
    },
    pause: true,
    repeat: Infinity,
  });

  return (
    <>
      <div className="button-container">
        <Button onClick={controller.start}>Start</Button>
        <Button onClick={controller.stop}>Stop</Button>
      </div>
      <div className="mover mover--magenta" {...props} />
    </>
  );
};

GravityEventBased.args = {
  moverMass: 10000,
  attractorMass: 1000000000000,
  r: 7.5
}

export const GravityDelay = ({ moverMass, attractorMass, r }: Config) => {
  const [props] = useGravity<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      moverMass,
      attractorMass,
      r,
    },
    delay: 2000,
  });

  return <div className="mover mover--red" {...props} />;
};

GravityDelay.args = {
  moverMass: 10000,
  attractorMass: 1000000000000,
  r: 7.5
}

export const GravityInfinite = ({ moverMass, attractorMass, r, repeatType }: Config) => {
  const [props] = useGravity<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      moverMass,
      attractorMass,
      r,
    },
    repeat: Infinity,
    repeatType,
  });

  return <div className="mover mover--purple" {...props} />;
};

GravityInfinite.args = {
  moverMass: 10000,
  attractorMass: 1000000000000,
  r: 7.5,
  repeatType: 'mirror'
}