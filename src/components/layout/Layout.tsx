import Loader from '../loader/Loader';
import styles from './Layout.module.css';
import MenuSidebar from '../menu-sidebar/MenuSidebar';
import TopBar from '../top-bar/TopBar';
import { useAppContext } from '../../lib/context/app/appContext';
import useWindowsWidth from '../../lib/hooks/windowWidth.hook';
import React, { FC, useEffect } from 'react';
import setAxiosInterceptor from '../../lib/interceptors/axios.interceptor';
import { useTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';

const Layout: FC = ({ children }) => {
  const { setLoading, logout, isSidebarOpen } = useAppContext();
  const { t } = useTranslation();
  const isScreenSmall = useWindowsWidth();

  useEffect(() => {
    setAxiosInterceptor({ setLoading, logout }, t);
  }, []);

  return (
    <div id="app">
      <Loader />
      <ToastContainer />
      <div id={styles.appWrapper}>
        <MenuSidebar />
        <div
          style={{
            paddingLeft: isSidebarOpen || isScreenSmall ? '0px' : '100px'
          }}
          className={styles.appView}
        >
          <TopBar />
          <div
            style={{
              paddingLeft: isSidebarOpen && !isScreenSmall ? '250px' : ''
            }}
            className={styles.viewWrapper}
          >
            <div className={styles.viewContainer}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
