import React, { useLayoutEffect, useRef, useState, FC, useEffect } from 'react';

import { useFriction } from '../src';

import Button from './components/Button';
import Toggle from './components/Toggle';

import './index.css';

export default {
  title: 'Friction',
};

interface Config {
  mu: number;
  mass: number;
  initialVelocity: number;
  repeatType?: 'mirror' | 'loop';
}

export const FrictionBasic = ({ mu, mass, initialVelocity }: Config) => {
  const [props] = useFriction<HTMLDivElement>({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mu,
      mass,
      initialVelocity,
    },
  });

  return <div className="mover mover--purple" {...props} />;
};

FrictionBasic.args = {
  mu: 0.5,
  mass: 300,
  initialVelocity: 10
}

export const FrictionControlled = ({ mu, mass, initialVelocity }: Config) => {
  const [toggle, setToggle] = useState(true);

  const [props] = useFriction<HTMLDivElement>({
    from: {
      opacity: toggle ? 0 : 1,
      transform: toggle ? 'scale(0) rotate(0deg)' : 'scale(1) rotate(180deg)',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'scale(1) rotate(180deg)' : 'scale(0) rotate(0deg)',
    },
    config: {
      mu,
      mass,
      initialVelocity,
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

FrictionControlled.args = {
  mu: 0.25,
  mass: 50,
  initialVelocity: 5
}

export const FrictionEventBased = ({ mu, mass, initialVelocity }: Config) => {
  const [props, controller] = useFriction<HTMLDivElement>({
    from: { transform: 'skewY(0deg)' },
    to: { transform: 'skewY(30deg)' },
    config: {
      mu,
      mass,
      initialVelocity,
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

FrictionEventBased.args = {
  mu: 0.5,
  mass: 300,
  initialVelocity: 10
}

export const FrictionDelay = ({ mu, mass, initialVelocity }: Config) => {
  const [props] = useFriction<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      mu,
      mass,
      initialVelocity,
    },
    delay: 2000,
  });

  return <div className="mover mover--red" {...props} />;
};

FrictionDelay.args = {
  mu: 0.5,
  mass: 300,
  initialVelocity: 10
}

export const FrictionInfinite = ({ mu, mass, initialVelocity, repeatType }: Config) => {
  const [props] = useFriction<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    reducedMotion: {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    config: {
      mu,
      mass,
      initialVelocity,
    },
    repeat: Infinity,
    repeatType,
  });

  return <div className="mover mover--red" {...props} />;
};

FrictionInfinite.args = {
  mu: 0.5,
  mass: 300,
  initialVelocity: 10,
  repeatType: 'mirror'
}

export const FrictionSVG = ({ mu, mass, initialVelocity }: Config) => {
  const [pathLength, setPathLength] = useState<number>(0);

  useLayoutEffect(() => {
    const path = document.querySelector<SVGPathElement>('#github-icon');

    if (path && path.getTotalLength() > 0) {
      setPathLength(path.getTotalLength());
    }
  }, []);

  const [props] = useFriction<SVGPathElement>({
    from: {
      strokeDashoffset: 0,
    },
    to: {
      strokeDashoffset: pathLength,
    },
    config: {
      mu,
      mass,
      initialVelocity,
    },
    repeat: Infinity,
  });

  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7860ed"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        id="github-icon"
        strokeDasharray={pathLength}
        {...props}
      />
    </svg>
  );
};

FrictionSVG.args = {
  mu: 0.25,
  mass: 300,
  initialVelocity: 5
}

export const FrictionProgress = ({ mu, mass, initialVelocity }: Config) => {
  const progressRef = useRef<HTMLSpanElement>(null);

  useFriction<HTMLDivElement>({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mu,
      mass,
      initialVelocity,
    },
    onFrame: (progress) => {
      if (progressRef.current) {
        progressRef.current.innerText = `${progress.toFixed(2)}`;
      }
    },
  });

  return <span ref={progressRef} style={{ fontSize: '2rem' }} />;
};

FrictionProgress.args = {
  mu: 0.1,
  mass: 30,
  initialVelocity: 10
}

export const FrictionSet = ({ mu, mass, initialVelocity }: Config) => {
  const [props, controller] = useFriction<HTMLDivElement>({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mu,
      mass,
      initialVelocity,
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      controller.set({
        transform: `translate(${Math.floor(Math.random() * 300) * (Math.random() > 0.5 ? 1 : -1)
          }px, ${Math.floor(Math.random() * 300) * (Math.random() > 0.5 ? 1 : -1)
          }px) rotate(${Math.random() * 360}deg) scale(${Math.random()})`,
        opacity: Math.random(),
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [controller]);

  return <div className="mover mover--magenta" {...props} />;
};

FrictionSet.args = {
  mu: 0.5,
  mass: 300,
  initialVelocity: 10
}