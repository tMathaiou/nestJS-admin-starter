import { ReactNode, useState } from 'react';
import {
  AppContext,
  appContextDefaultValues,
  AppContextType
} from './appContext';
import { User } from '../../../interfaces/user';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [, setCookie, removeCookie] = useCookies();
  const router = useRouter();

  const [state, setState] = useState<AppContextType>({
    ...appContextDefaultValues,
    langID: router.locale === 'el' ? 1 : 0
  });

  const logout = () => {
    removeCookie('token');
    removeCookie('user');
    setState({ ...state, loggedIn: false, token: null, user: null });
    return router.push('/login');
  };

  const setUser = (user: User): void => setState({ ...state, user });
  const setLoading = (loading: boolean): void =>
    setState({ ...state, loading });
  const setLangId = (langID: number): void => {
    setCookie('NEXT_LOCALE', langID === 0 ? 'en' : 'el');
    setState({ ...state, langID });
  };
  const setLoggedIn = (loggedIn: boolean): void =>
    setState({ ...state, loggedIn });
  const setToken = (token: string): void => setState({ ...state, token });
  const toggleSidebar = (): void =>
    setState({ ...state, isSidebarOpen: !state.isSidebarOpen });

  const value = {
    ...state,
    setUser,
    setLoading,
    setLangId,
    setLoggedIn,
    setToken,
    toggleSidebar,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
