import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { TFunction } from 'react-i18next';
import { API_URL } from '../utils/constant';

let interceptorsSet = false;
const setAxiosInterceptor = ({ setLoading, logout }, t: TFunction) => {
  if (interceptorsSet) {
    return;
  }

  interceptorsSet = true;
  axios.interceptors.request.use(
    (config) => {
      setLoading(true);
      return config;
    },
    (error: AxiosError) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      setTimeout(() => setLoading(false), 500);
      return response;
    },
    (error: AxiosError) => {
      if (
        error.response.status === 401 &&
        error.response.config.url !== `${API_URL}/api/auth`
      ) {
        logout();
        setTimeout(() => toast.error(t('messages.access_denied')), 100);
      }
      setLoading(false);
      return Promise.reject(error);
    }
  );
};

export default setAxiosInterceptor;
