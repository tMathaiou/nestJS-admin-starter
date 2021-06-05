import { useAppContext } from '../context/app/appContext';

const useAppDefaults = () => {
  const { setToken, setLoggedIn } = useAppContext();

  return (cookieData: any) => {
    if (!cookieData) {
      return;
    }
    if (cookieData.token) {
      setToken(cookieData.token);
    }
    if (cookieData.token) {
      setLoggedIn(true);
    }
  };
};

export default useAppDefaults;
