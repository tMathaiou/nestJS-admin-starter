import React from 'react';
import styles from './logo.module.css';
import useWindowsWidth from '../../lib/hooks/windowWidth.hook';
import { useAppContext } from '../../lib/context/app/appContext';
import Link from 'next/link';
import { PRIMARY_COLOR } from '../../lib/utils/constant';

const Logo = () => {
  const { isSidebarOpen } = useAppContext();
  const isScreenSmall = useWindowsWidth();

  return (
    <div
      style={{
        backgroundColor: PRIMARY_COLOR,
        width: isSidebarOpen ? '250px' : '',
        display: isScreenSmall ? 'none' : 'block'
      }}
      className={styles.logo}
    >
      <div className={styles.logoWrapper}>
        <Link href="/">
          <a>
            <img alt="logo" src="/images/logo.svg" width="100" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
