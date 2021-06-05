import axios, { AxiosError, AxiosResponse } from 'axios';
import { Login } from '../../interfaces/login';
import { tryCatch } from '../utils/apiUtils';
import { API_URL } from '../utils/constant';
import { toast } from 'react-toastify';
import { i18n } from 'next-i18next';

const AuthAPI = {
  login: async (email, password) => {
    const [err, response]: [AxiosError, AxiosResponse<Login>] = await tryCatch(
      axios.post(`${API_URL}/api/auth`, { email, password })
    );

    if (err) {
      toast.error(i18n.t('commons.wrong_credentials'));
      throw new Error(err.message);
    }

    return response.data;
  }
};

export default AuthAPI;
