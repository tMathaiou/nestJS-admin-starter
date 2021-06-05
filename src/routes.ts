import { RouteObject } from './interfaces/route';

export const routes: RouteObject[] = [
  {
    path: '/',
    name: 'home',
    icon: 'home',
    exact: true,
    menu: true
  },
  {
    path: '/users',
    name: 'users',
    icon: 'users',
    exact: true,
    menu: true
  },
  {
    path: '/users/new',
    name: 'usersFormNew',
    exact: true,
    menu: false
  },
  {
    path: '/users/:id',
    name: 'usersFormEdit',
    exact: true,
    menu: false
  }
];
