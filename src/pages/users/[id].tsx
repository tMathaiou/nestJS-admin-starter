import React, { FC, useEffect } from 'react';
import { Form } from 'react-final-form';
import FormActionHeader from '../../components/users/FormActionHeader';
import styles from './usersForm.module.css';
import UserForm from '../../components/users/UserForm';
import { User } from '../../interfaces/user';
import { parseCookies, removeEmpty } from '../../lib/utils/apiUtils';
import { isAuthorized } from '../../lib/utils/serverUtils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useAppDefaults from '../../lib/hooks/appDefaults.hook';
import { validate } from '../../components/users/validation';
import { useFetchUser } from '../../lib/hooks/fetchUsers.hook';
import { useTranslation } from 'next-i18next';
import { mutateMany } from '../../lib/utils/cache';
import { useRouter } from 'next/router';
import fetcher, { updater } from '../../lib/utils/fetcher';
import { API_URL } from '../../lib/utils/constant';
import swal from 'sweetalert2';
import { ReactSweetAlert } from 'sweetalert2-react-content';

type SweetAlert2 = typeof swal;

type UserProps = {
  cookieData: any;
  dataUser: User;
};

const UsersFormEdit: FC<UserProps> = ({ cookieData, dataUser }) => {
  const router = useRouter();
  const setAppDefaults = useAppDefaults();
  const { t } = useTranslation();
  const { id, page, userId, userFirstName, userLastName, userEmail } =
    router.query;

  const { user } = useFetchUser(id, dataUser);

  const save = async (values: User) => {
    const { error } = await updater(
      `${API_URL}/api/users/${values.id}`,
      'put',
      values
    );
    await mutateMany(
      (key) => key.includes('/api/users') || key.includes(`/api/users/${id}`),
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
        null,
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
                initialValues={user}
                onSubmit={save}
                validate={(values) => validate(values, t, id)}
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

export const getServerSideProps = async ({ locale, req, query }) => {
  const cookies = parseCookies(req);
  let dataUser = {} as User;

  if (!isAuthorized(req)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const { id } = query;

  if (id && !isNaN(id)) {
    const user: User = await fetcher(
      `${API_URL}/api/users/${id}`,
      cookies.token
    );
    if (user) {
      dataUser = user;
    }
  }

  return {
    props: {
      dataUser,
      cookieData: cookies && cookies,
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
};

export default UsersFormEdit;
