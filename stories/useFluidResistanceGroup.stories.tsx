import React, { FC } from 'react';

import { useFluidResistanceGroup } from '../src';

import Button from './components/Button';
import { getRandomHex } from './utils';

import './index.css';

export default {
  title: 'FluidResistanceMultiple',
};

interface Config {
  mass: number;
  rho: number;
  area: number;
  cDrag: number;
  settle: boolean;
}

export const FluidResistanceMultipleBasic = ({ mass, rho, area, cDrag, settle }: Config) => {
  const [nodes] = useFluidResistanceGroup<HTMLDivElement>(5, (i) => ({
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
      mass,
      rho,
      area,
      cDrag,
      settle,
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

FluidResistanceMultipleBasic.args = {
  mass: 20,
  rho: 20,
  area: 20,
  cDrag: 0.1,
  settle: true
}

export const FluidResistanceMultipleEventBased = ({ mass, rho, area, cDrag, settle }: Config) => {
  const [nodes, controller] = useFluidResistanceGroup(5, (i) => ({
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
      mass,
      rho,
      area,
      cDrag,
      settle,
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

FluidResistanceMultipleEventBased.args = {
  mass: 25,
  rho: 10,
  area: 20,
  cDrag: 0.25,
  settle: true
}