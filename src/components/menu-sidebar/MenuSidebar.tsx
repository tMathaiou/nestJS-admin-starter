import React, { useState } from 'react';
import styles from './menuSidebar.module.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { routes } from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowsWidth from '../../lib/hooks/windowWidth.hook';
import { useTranslation } from 'next-i18next';
import { useAppContext } from '../../lib/context/app/appContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PRIMARY_COLOR } from '../../lib/utils/constant';

const MenuSidebar = () => {
  const { t } = useTranslation('common');
  const [isHovering, setHovering] = useState(false);
  const { isSidebarOpen } = useAppContext();
  const router = useRouter();
  const isScreenSmall = useWindowsWidth();

  const onMouseOut = () => {
    setHovering(false);
  };
  const onMouseOver = () => {
    setHovering(true);
  };

  const getHoverClasses = (): string => {
    let output = `${styles.menuSidebar} slide`;
    if (isHovering || isSidebarOpen) {
      output += ` ${styles.hover}`;
    }
    return output;
  };

  return (
    <div
      style={{
        left: isScreenSmall && !isSidebarOpen ? '-1000px' : '0px',
        position: isScreenSmall && isSidebarOpen ? 'absolute' : 'fixed'
      }}
      className={getHoverClasses()}
      onMouseLeave={onMouseOut}
      onMouseEnter={onMouseOver}
    >
      <div className="menu-sidebar-wrapper">
        <PerfectScrollbar className={styles.menuSidebarScroller}>
          <ul className={styles.menuNav}>
            {routes.map((item, index) =>
              item.menu ? (
                <li
                  className={
                    router.pathname === item.path
                      ? `${styles.menuNavItem} ${styles.active}`
                      : styles.menuNavItem
                  }
                  key={index}
                >
                  <Link href={item.path}>
                    <a className={styles.menuNavLink}>
                      <FontAwesomeIcon
                        className={styles.menuNavIcon}
                        icon={item.icon}
                        style={{
                          color: router.pathname === item.path && PRIMARY_COLOR
                        }}
                      />
                      <span
                        className={
                          !isHovering && !isSidebarOpen
                            ? `${styles.menuNavText} ${styles.hidden}`
                            : styles.menuNavText
                        }
                        style={{ color: PRIMARY_COLOR }}
                      >
                        {t('menu.' + item.name)}
                      </span>
                    </a>
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default MenuSidebar;
