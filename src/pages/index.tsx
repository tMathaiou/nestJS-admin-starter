import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { parseCookies } from '../lib/utils/apiUtils';
import { useEffect } from 'react';
import useAppDefaults from '../lib/hooks/appDefaults.hook';
import styles from './index.module.css';
import { useTranslation } from 'next-i18next';
import { isAuthorized } from '../lib/utils/serverUtils';

type HomeProps = {
  cookieData: any;
};

export default function Home({ cookieData }: HomeProps) {
  const { t } = useTranslation();
  const setAppDefaults = useAppDefaults();

  useEffect(() => {
    setAppDefaults(cookieData);
  }, [cookieData]);

  return (
    <div className="home">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.portlet}>
            <div className={styles.portletHeader}>
              <div className={styles.portletHeaderTitle}>
                <h3>{t('pages.home.title')}</h3>
              </div>
            </div>
            <div className={styles.portletBody}>{t('pages.home.desc')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ locale, req }) => {
  const data = parseCookies(req);

  if (!isAuthorized(req)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {
      cookieData: data && data,
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
};
