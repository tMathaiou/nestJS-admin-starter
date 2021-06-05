import type { AppProps } from 'next/app';
import { AppProvider } from '../lib/context/app/AppProvider';
import {
  faEdit,
  faHome,
  faSignOutAlt,
  faTrashAlt,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import '../styles/globals.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import { CookiesProvider } from 'react-cookie';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';

library.add(faHome, faUsers, faSignOutAlt, faEdit, faTrashAlt);
NProgress.configure({ showSpinner: true });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  if (router.pathname === '/login') {
    return (
      <CookiesProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </CookiesProvider>
    );
  }

  return (
    <CookiesProvider>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </CookiesProvider>
  );
}

export default appWithTranslation(MyApp);
