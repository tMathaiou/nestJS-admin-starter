import { createContext, useContext } from 'react';
import { User } from '../../../interfaces/user';
import { Pagination } from '../../../interfaces/pagination';
import { UserFilters } from '../../../interfaces/userFilters';
import { List } from '../../../interfaces/list';

export type AppContextType = {
  isSidebarOpen: boolean;
  langID: number;
  loggedIn: boolean;
  loading: boolean;
  token: string;
  user: User;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setLangId: (langID: number) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setToken: (token: string) => void;
  toggleSidebar: () => void;
  fetchUsers: (params: Pagination & UserFilters) => Promise<List<User>>;
};

export const appContextDefaultValues = {
  isSidebarOpen: false,
  langID: 1,
  loggedIn: false,
  loading: false,
  token: '',
  user: null
} as AppContextType;

export const AppContext = createContext<AppContextType>(
  appContextDefaultValues
);

export function useAppContext() {
  return useContext(AppContext);
}
