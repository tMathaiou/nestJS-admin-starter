import React, { useEffect, useState } from 'react';
import styles from './topBar.module.css';
import { useTranslation } from 'react-i18next';
import { routes } from '../../routes';
import Logo from '../logo/Logo';
import { useAppContext } from '../../lib/context/app/appContext';
import { useRouter } from 'next/router';
import RightActionBar from '../right-actionbar/RightActionBar';

const TopBar = () => {
  const { t } = useTranslation();
  const [currentPageName, setCurrentPageName] = useState('');
  const { toggleSidebar } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const cRoute = routes.find((route) => route.path === router.pathname);
    setCurrentPageName(cRoute ? t(`menu.${cRoute.name}`) : '');
  }, [t, router]);

  return (
    <div className={styles.topBar}>
      <Logo />
      <h3 className={styles.pageTitle}>
        <div className={styles.burger}>
          <button onClick={toggleSidebar} className={styles.burgerBtn}>
            <span />
          </button>
        </div>
        {currentPageName}
      </h3>
      <RightActionBar />
    </div>
  );
};

export default TopBar;
