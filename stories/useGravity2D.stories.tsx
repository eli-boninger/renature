import React, { useState, useLayoutEffect, FC } from 'react';

import { useGravity2D } from '../src';
import './index.css';

export default {
  title: 'Gravity2D',
};

interface Config {
  attractorMass: number;
  moverMass: number;
  initialMoverVelocity: [number, number];
  threshold: { min: number, max: number };
  timeScale: number;
  G?: number;
}

export const Gravity2DBasic = ({ attractorMass, moverMass, initialMoverVelocity, threshold, timeScale }: Config) => {
  const [center, setCenter] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    const root = document.getElementById('root');

    if (root) {
      setCenter([root.clientWidth / 2, root.clientHeight / 2]);
    }
  }, []);

  const [props] = useGravity2D({
    config: {
      attractorMass,
      moverMass,
      attractorPosition: center,
      initialMoverPosition: [center[0], center[1] - 200],
      initialMoverVelocity,
      threshold,
      timeScale,
    },
  });

  return (
    <div className="space">
      <div className="mover-2d" {...props} />
      <div
        className="attractor-2d"
        style={{ left: center[0], top: center[1] }}
      />
    </div>
  );
};

Gravity2DBasic.args = {
  attractorMass: 1000000000000,
  moverMass: 10000,
  initialMoverVelocity: [1, 0],
  threshold: { min: 20, max: 100 },
  timeScale: 100
}

export const Gravity2DCustomG = ({ attractorMass, moverMass, initialMoverVelocity, threshold, timeScale, G }: Config) => {
  const [center, setCenter] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    const root = document.getElementById('root');

    if (root) {
      setCenter([root.clientWidth / 2, root.clientHeight / 2]);
    }
  }, []);

  const [props] = useGravity2D({
    config: {
      attractorMass,
      moverMass,
      attractorPosition: center,
      initialMoverPosition: [center[0] - 50, center[1]],
      initialMoverVelocity,
      threshold,
      timeScale,
      G,
    },
  });

  return (
    <div className="space">
      <div className="mover-2d" {...props} />
      <div
        className="attractor-2d"
        style={{ left: center[0], top: center[1] }}
      />
    </div>
  );
};

Gravity2DCustomG.args = {
  attractorMass: 20,
  moverMass: 1,
  initialMoverVelocity: [0, 2],
  threshold: { min: 10, max: 25 },
  timeScale: 100,
  G: 0.4
}