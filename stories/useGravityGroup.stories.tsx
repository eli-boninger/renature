import React, { FC } from 'react';

import { useGravityGroup } from '../src';

import Button from './components/Button';
import { getRandomHex } from './utils';

import './index.css';

export default {
  title: 'GravityMultiple',
};

interface Config {
  moverMass: number;
  attractorMass: number;
  r: number;
}

export const GravityMultipleBasic = ({ moverMass, attractorMass, r }: Config) => {
  const [nodes] = useGravityGroup(5, (i) => ({
    from: {
      transform: 'translateY(0px)',
      background: '#7860ed',
      borderRadius: '10%',
    },
    to: {
      transform: 'translateY(100px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    config: {
      moverMass,
      attractorMass,
      r,
    },
    delay: i * 500,
    repeat: Infinity,
  }));

  return (
    <div className="stack-horizontal">
      {nodes.map((props, i) => (
        <div className="mover mover--purple" key={i} {...props} />
      ))}
    </div>
  );
};

GravityMultipleBasic.args = {
  moverMass: 10000,
  attractorMass: 1000000000000,
  r: 7.5
}

export const GravityMultipleEventBased = ({ moverMass, attractorMass, r }: Config) => {
  const [nodes, controller] = useGravityGroup(5, (i) => ({
    from: {
      transform: 'translateY(0px)',
      background: '#7860ed',
      borderRadius: '10%',
    },
    to: {
      transform: 'translateY(100px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    config: {
      moverMass,
      attractorMass,
      r,
    },
    pause: true,
    delay: i * 1000,
    repeat: Infinity,
  }));

  return (
    <div className="stack-horizontal">
      <div className="button-container">
        <Button onClick={controller.start}>Start</Button>
        <Button onClick={controller.pause}>Pause</Button>
        <Button onClick={controller.stop}>Stop</Button>
      </div>
      {nodes.map((props, i) => (
        <div className="mover mover--purple" key={i} {...props} />
      ))}
    </div>
  );
};

GravityMultipleEventBased.args = {
  moverMass: 10000,
  attractorMass: 1000000000000,
  r: 7.5
}