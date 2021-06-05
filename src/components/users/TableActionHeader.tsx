import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './tableActionHeader.module.css';
import { useRouter } from 'next/router';

const TableActionHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className={styles.portletHeader}>
      <div className={styles.portletHeaderTitle}>
        <h3>{t('pages.users.title')}</h3>
      </div>
      <div className={styles.portletActions}>
        <Link href={{ pathname: '/users/new', query: router.query }}>
          <a className="btn btn-sm btn-primary">{t('commons.add_new')}</a>
        </Link>
      </div>
    </div>
  );
};

export default TableActionHeader;
