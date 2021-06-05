import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './login.module.css';
import { useAppContext } from '../../lib/context/app/appContext';
import { parseCookies, tryCatch } from '../../lib/utils/apiUtils';
import { useRouter } from 'next/router';
import AuthAPI from '../../lib/api/auth';
import { useCookies } from 'react-cookie';
import { Login } from '../../interfaces/login';
import { ToastContainer } from 'react-toastify';
import { isAuthorized } from '../../lib/utils/serverUtils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LoginComponent = () => {
  const [, setCookie] = useCookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const { setLoggedIn, setToken, setUser } = useAppContext();
  const { push, asPath, locale } = useRouter();

  const onEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const onPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  const submit = async (e) => {
    e.preventDefault();
    const [err, login]: [string, Login] = await tryCatch(
      AuthAPI.login(email, password)
    );
    if (!err) {
      setCookie('token', login.token);
      setCookie('user', JSON.stringify(login.user));

      setToken(login.token);
      setUser(login.user);
      setLoggedIn(true);

      push('/', asPath, { locale });
    }
  };

  return (
    <div className={styles.login}>
      <ToastContainer />
      <div className={styles.loginWrapper}>
        <div className={styles.loginBg}>
          <div className={styles.box}>
            <div className={`${styles.loginContainer} container`}>
              <div className={`${styles.loginLogo}`}>
                <img alt="logo" src="/images/logoLogin.svg" width="150px" />
              </div>
              <div className={styles.signIn}>
                <form onSubmit={submit}>
                  <div className={`${styles.loginInputGroup} input-group`}>
                    <input
                      placeholder={t('commons.email')}
                      autoComplete="off"
                      className={`${styles.loginFormControl} form-control`}
                      name="email"
                      onChange={onEmailChange}
                      type="text"
                      value={email}
                    />
                  </div>
                  <div className={`${styles.loginInputGroup} input-group`}>
                    <input
                      placeholder={t('commons.password')}
                      className={`${styles.loginFormControl} form-control`}
                      name="password"
                      onChange={onPasswordChange}
                      type="password"
                      value={password}
                    />
                  </div>
                  <div className={styles.loginActions}>
                    <button
                      disabled={!email || !password}
                      onClick={submit}
                      className={`btn btn-pill ${styles.loginBtn}`}
                    >
                      {t('commons.sign_in')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale, req }) => {
  const data = parseCookies(req);

  if (isAuthorized(req)) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
};

export default LoginComponent;
