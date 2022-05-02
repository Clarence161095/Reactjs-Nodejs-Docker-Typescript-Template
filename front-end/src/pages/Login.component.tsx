/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthApi from '../api/AuthApi';
import { useLoggedHook } from '../hooks/logged.hook';
import { DEFAULT_LOGGED_STATE } from '../states/login.state';
import '../styles/style.css';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();

  const [loggedState, setLoggedState] = useLoggedHook();

  useEffect(() => {
    if (loggedState.logged) {
      navigate('/home');
    }
    if (localStorage.getItem('access-token')) {
      const _fetch = async () => {
        try {
          const resultGetToken: any = await toast.promise(
            AuthApi.getToken(),
            {
              success: 'Tự động đăng nhập thành công 👌',
              error: 'Tự động đăng nhập gặp lỗi!!!! 🤯',
            },
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
            navigate('/home');
          } else {
            setLoggedState(DEFAULT_LOGGED_STATE);
          }
        } catch (error) {
          localStorage.clear();
        }
      };
      _fetch();
    }
  }, []);

  const handleLogin = () => {
    if (loggedState.logged) {
      navigate('/home');
    }

    if (checkDisabledButton()) {
      const _fetch = async () => {
        try {
          const resultLogin: any = await toast.promise(
            AuthApi.login(userName, password),
            {
              pending: 'Đang kiểm tra đăng nhập...⌛',
              success: 'Đăng nhập thành công 👌',
              error: 'Đăng nhập thất bại!!!! 🤯',
            }
          );

          if (resultLogin.data.data.attributes['access-token']) {
            localStorage.setItem(
              'access-token',
              resultLogin.data.data.attributes['access-token']
            );
            localStorage.setItem(
              'refresh-token',
              resultLogin.data.data.attributes['refresh-token']
            );

            const resultGetToken: any = await toast.promise(AuthApi.getToken(), {
              pending: 'Đang lưu dữ liệu đăng nhập...⌛',
              success: 'Dữ liệu đăng nhập đã được lưu lại. 👌',
              error: 'Dữ liệu đăng có vấn đề!!!! 🤯',
            });

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
                accessToken: resultLogin.data.data.attributes['access-token'],
                email: resultGetToken.data.data.attributes['email'],
                role: resultGetToken.data.data.attributes['role'],
                logged: true,
              });
            }
            navigate('/home');
          }
        } catch (error: any) {
          if (error.message) {

            switch (error.response.status) {
              case 304:
                setErrorMessage('Server lỗi... xin vui lòng trở lại sau!');
                break;
              default:setErrorMessage('Sai tên đăng nhập hoặc mật khẩu!');
                break;
            }

          }
        }
      };
      _fetch();
    }
  };

  const checkValidateUser = () => {
    if (userName === '') {
      return '';
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userName))
      return 'Tên đăng nhập phải là email.';
    return '';
  };

  const checkValidatePassword = () => {
    if (password === '') {
      return '';
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(password))
      return 'Mật khẩu ít nhất phải có 6 ký tự và chứa ký tự in hoa.';
    return '';
  };

  const checkDisabledButton = () => {
    return (
      checkValidateUser() === '' &&
      checkValidatePassword() === '' &&
      userName !== '' &&
      password !== ''
    );
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="loginCmp">
      <div className="loginCmp_form">
        <div className="loginCmp_form_title">Đăng nhập</div>
        <input
          className="loginCmp_form_input"
          type="text"
          alt="username"
          placeholder="Tên đăng nhập/Email"
          value={userName}
          onKeyDown={handleKeyDown}
          onChange={(e) => setUserName(e.target.value)}
        />
        <span>{checkValidateUser()}</span>
        <input
          className="loginCmp_form_password"
          type="password"
          alt="password"
          placeholder="Mật khẩu"
          value={password}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>{checkValidatePassword()}</span>
        <div className="loginCmp_form_btnGroup">
          <button
            className="loginCmp_form_btnGroup_login"
            disabled={!checkDisabledButton()}
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
          <button className="loginCmp_form_btnGroup_register">Đăng ký</button>{' '}
        </div>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
}

export default Login;
