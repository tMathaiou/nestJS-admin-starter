import React from 'react';
import styles from './loader.module.css';
import { useAppContext } from '../../lib/context/app/appContext';
import { PRIMARY_COLOR } from '../../lib/utils/constant';

const Loader = () => {
  const { loading } = useAppContext();
  const spinnerStyle = {
    backgroundColor: PRIMARY_COLOR,
    height: '35px',
    width: '4px',
    margin: '2px',
    borderRadius: '2px',
    display: 'inline-block',
    animationName: styles.vScaleStretchDelay,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
    animationFillMode: 'both'
  };
  const spinnerDelay1 = { animationDelay: '0.1s' };
  const spinnerDelay2 = { animationDelay: '0.2s' };
  const spinnerDelay3 = { animationDelay: '0.3s' };
  const spinnerDelay4 = { animationDelay: '0.4s' };
  const spinnerDelay5 = { animationDelay: '0.5s' };

  if (!loading) {
    return null;
  }

  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.vSpinner}>
        <div
          className="v-scale v-scale1"
          style={{ ...spinnerStyle, ...spinnerDelay1 }}
        />
        <div
          className="v-scale v-scale2"
          style={{ ...spinnerStyle, ...spinnerDelay2 }}
        />
        <div
          className="v-scale v-scale3"
          style={{ ...spinnerStyle, ...spinnerDelay3 }}
        />
        <div
          className="v-scale v-scale4"
          style={{ ...spinnerStyle, ...spinnerDelay4 }}
        />
        <div
          className="v-scale v-scale5"
          style={{ ...spinnerStyle, ...spinnerDelay5 }}
        />
      </div>
    </div>
  );
};

export default Loader;
