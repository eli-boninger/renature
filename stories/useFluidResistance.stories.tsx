import React, { useState } from 'react';

import { useFluidResistance } from '../src';

import Toggle from './components/Toggle';
import Button from './components/Button';

export default {
  title: 'FluidResistance',
};

interface Config {
  mass: number;
  rho: number;
  area: number;
  cDrag: number;
  settle: boolean;
  repeatType?: 'mirror' | 'loop';
}

export const FluidResistanceBasic = ({ mass, rho, area, cDrag, settle }: Config) => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      transform: 'translateY(-100%)',
    },
    to: {
      transform: 'translateY(100%)',
    },
    config: {
      mass,
      rho,
      area,
      cDrag,
      settle,
    },
  });

  return <div className="mover mover--magenta" {...props} />;
};

FluidResistanceBasic.args = {
  mass: 20,
  rho: 20,
  area: 20,
  cDrag: 0.1,
  settle: true
}

export const FluidResistanceControlled = ({ mass, rho, area, cDrag, settle }: Config) => {
  const [toggle, setToggle] = useState(true);

  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      opacity: toggle ? 0 : 1,
      transform: toggle ? 'scale(0) rotate(0deg)' : 'scale(1) rotate(180deg)',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'scale(1) rotate(180deg)' : 'scale(0) rotate(0deg)',
    },
    config: {
      mass,
      rho,
      area,
      cDrag,
      settle,
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

FluidResistanceControlled.args = {
  mass: 20,
  rho: 20,
  area: 20,
  cDrag: 0.1,
  settle: true
}

export const FluidResistanceEventBased = ({ mass, rho, area, cDrag, settle }: Config) => {
  const [props, controller] = useFluidResistance<HTMLDivElement>({
    from: { transform: 'skewY(0deg)' },
    to: { transform: 'skewY(30deg)' },
    config: {
      mass,
      rho,
      area,
      cDrag,
      settle,
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

FluidResistanceEventBased.args = {
  mass: 20,
  rho: 20,
  area: 20,
  cDrag: 0.1,
  settle: false
}

export const FluidResistanceDelay = ({ mass, rho, area, cDrag, settle }: Config) => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      mass,
      rho,
      area,
      cDrag,
      settle,
    },
    delay: 2000,
  });

  return <div className="mover mover--red" {...props} />;
};

FluidResistanceDelay.args = {
  mass: 20,
  rho: 20,
  area: 20,
  cDrag: 0.1,
  settle: true
}

export const FluidResistanceInfinite = ({ mass, rho, area, cDrag, settle, repeatType }: Config) => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      mass,
      rho,
      area,
      cDrag,
      settle,
    },
    repeat: Infinity,
    repeatType,
  });

  return <div className="mover mover--purple" {...props} />;
};

FluidResistanceInfinite.args = {
  mass: 20,
  rho: 20,
  area: 20,
  cDrag: 0.1,
  settle: true,
  repeatType: 'mirror'
}

export const FluidResistanceBoxShadow = ({ mass, rho, area, cDrag, settle }: Config) => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      boxShadow: '20px 20px 50px teal, -20px -20px 50px orange',
    },
    to: {
      boxShadow: '-20px -20px 0px teal, 20px 20px 0px orange',
    },
    config: {
      mass,
      rho,
      area,
      cDrag,
      settle,
    },
    repeat: Infinity,
  });

  return <div className="mover mover--purple" {...props} />;
};

FluidResistanceBoxShadow.args = {
  mass: 20,
  rho: 20,
  area: 20,
  cDrag: 0.1,
  settle: false,
}

export const FluidResistanceRepeatCount = ({ mass, rho, area, cDrag, settle }: Config) => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      transform: 'translateX(0px)',
    },
    to: {
      transform: 'translateX(100px)',
    },
    config: {
      mass,
      rho,
      area,
      cDrag,
      settle,
    },
    repeat: 2,
  });

  return <div className="mover mover--purple" {...props} />;
};

FluidResistanceRepeatCount.args = {
  mass: 20,
  rho: 20,
  area: 20,
  cDrag: 0.1,
  settle: false,
}
