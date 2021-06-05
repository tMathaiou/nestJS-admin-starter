import axios, { AxiosError, AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';
import { tryCatch } from './apiUtils';
import { languages } from '../constants/languages';
import { Language } from '../../interfaces/language';
import { toast } from 'react-toastify';

const updateOptions = (token = null) => {
  const cookie = new Cookies();
  token = token || cookie.get('token');

  if (!!token) {
    return {
      headers: {
        authorization: token
      }
    };
  }
};

const handleError = (error) => {
  const cookie = new Cookies();
  const cookieLang = cookie.get('NEXT_LOCALE') || 'en';
  const selectedLanguage: any = languages?.find(
    (lang: Language) => lang.path === cookieLang
  );

  if (error?.response?.data?.err) {
    toast.error(error.response.data.err[selectedLanguage.path]);
  }
};

export default async function fetcher(url, token = null) {
  const { data } = await axios.get(url, updateOptions(token));
  return data;
}

export async function updater(
  url,
  method: 'delete' | 'post' | 'put' | 'patch',
  body: any = null
): Promise<{ data: AxiosResponse; error: AxiosError }> {
  const [error, response] = await tryCatch(
    axios[method](url, body, updateOptions())
  );

  if (error?.response) {
    handleError(error);
  }

  return { data: response?.data, error: error?.response };
}

export async function deleter(
  url,
  method: 'delete'
): Promise<{ error: AxiosError }> {
  const [error] = await tryCatch(axios[method](url, updateOptions()));

  if (error?.response) {
    handleError(error);
  }

  return { error: error?.response };
}
