/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import AuthApi from '../api/AuthApi';
import util from '../core/utilities.core';
import { DEFAULT_LOGGED_STATE, loggedGlobalState } from '../states/login.state';

export function useLoggedHook() {
  let navigate = useNavigate();
  const [loggedState, setLoggedState] = useRecoilState(loggedGlobalState);

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      const _fetch = async () => {
        try {
          const resultGetToken: any = await toast.promise(
            AuthApi.getToken(),
            {},
            {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );

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
          util.toastDebounce('Vui lòng đăng nhập lại... 🙏');
          navigate('/login');
        }
      };
      _fetch();
    } else {
      util.toastDebounce('Vui lòng đăng nhập lại... 🙏');
      navigate('/login');
    }
  }, []);

  return [loggedState, setLoggedState];
}
