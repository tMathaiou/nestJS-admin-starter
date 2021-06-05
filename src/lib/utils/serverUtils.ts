import { parseCookies } from './apiUtils';

export function isAuthorized(req) {
  const cookies = parseCookies(req);

  return !!cookies.token;
}
