/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import AuthApi from '../api/auth.api';
import { DEFAULT_LOGGED_STATE, loggedGlobalState } from '../states/login.state';

export function useLoggedHook() {
  let navigate = useNavigate();
  const [loggedState, setLoggedState] = useRecoilState(loggedGlobalState);

  const checkRole = (type: string) => {
    switch (type) {
      case 'general':
        return loggedState?.role === 'user' || loggedState?.role === 'admin';
      default:
        return false;
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      const _fetch = async () => {
        try {
          const resultGetToken: any = AuthApi.getToken();

          if (resultGetToken.data.data.attributes) {
            localStorage.setItem(
              'email',
              resultGetToken.data.data.attributes['email']
            );
            localStorage.setItem(
              'role',
              resultGetToken.data.data.attributes['role']
            );
            setLoggedState({
              accessToken: localStorage.getItem('access-token'),
              email: resultGetToken.data.data.attributes['email'],
              role: resultGetToken.data.data.attributes['role'],
              logged: true,
            });
          } else {
            setLoggedState(DEFAULT_LOGGED_STATE);
          }
        } catch (error) {
          navigate('/login');
        }
      };
      _fetch();
    } else {
      navigate('/login');
    }
  }, []);

  return [loggedState, setLoggedState, checkRole];
}
