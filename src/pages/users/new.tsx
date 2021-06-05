import React, { FC, useEffect } from 'react';
import { Form } from 'react-final-form';
import FormActionHeader from '../../components/users/FormActionHeader';
import styles from './usersForm.module.css';
import UserForm from '../../components/users/UserForm';
import { User } from '../../interfaces/user';
import { useRouter } from 'next/router';
import { parseCookies, removeEmpty } from '../../lib/utils/apiUtils';
import { isAuthorized } from '../../lib/utils/serverUtils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useAppDefaults from '../../lib/hooks/appDefaults.hook';
import { validate } from '../../components/users/validation';
import { useTranslation } from 'next-i18next';
import { mutateMany } from '../../lib/utils/cache';
import { updater } from '../../lib/utils/fetcher';
import { API_URL } from '../../lib/utils/constant';

type UserProps = {
  cookieData: any;
};

const UsersFormNew: FC<UserProps> = ({ cookieData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { page, userId, userFirstName, userLastName, userEmail } = router.query;
  const setAppDefaults = useAppDefaults();

  const save = async (values: User) => {
    const { error } = await updater(`${API_URL}/api/users`, 'post', values);
    await mutateMany(
      (key) => key.includes('/api/users'),
      () => undefined
    );

    if (!error) {
      return router.push(
        {
          pathname: '/users',
          query: removeEmpty({
            page,
            userId,
            userFirstName,
            userLastName,
            userEmail
          })
        },
        router.asPath,
        { locale: router.locale }
      );
    }
  };

  useEffect(() => {
    setAppDefaults(cookieData);
  }, [cookieData]);

  return (
    <div className="usersForm">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.portlet}>
            <FormActionHeader />
            <div className={styles.portletBody}>
              <Form
                onSubmit={save}
                validate={(values) => validate(values, t)}
                render={({ handleSubmit }) => (
                  <UserForm onSubmit={handleSubmit} />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default UsersFormNew;
