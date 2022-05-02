/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthApi from '../api/AuthApi';
import { Button, InputForm } from '../components/Material.component';
import { useLoggedHook } from '../hooks/logged.hook';
import { DEFAULT_LOGGED_STATE } from '../states/login.state';

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
              default:
                setErrorMessage('Sai tên đăng nhập hoặc mật khẩu!');
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
    <div className="flex flex-col justify-center items-center min-h-[74vh]">
      <div
        className="flex flex-col justify-center items-center border-2 rounded-xl
          px-4 py-3 w-[95%] max-w-md bg-[#130f406d]"
      >
        <div className="text-[2.5rem]">Đăng nhập</div>

        <InputForm
          InputAttributes={{
            type: 'text',
            alt: 'username',
            placeholder: 'Tên đăng nhập/Email',
            value: userName,
            onKeyDown: handleKeyDown,
            onChange: (e: any) => setUserName(e.target.value),
          }}
          checkValidate={checkValidateUser}
        />

        <InputForm
          InputAttributes={{
            type: 'password',
            alt: 'password',
            placeholder: 'Mật khẩu',
            value: password,
            onKeyDown: handleKeyDown,
            onChange: (e: any) => setPassword(e.target.value),
          }}
          checkValidate={checkValidatePassword}
        />

        <div className="flex flex-row justify-center items-center mt-1">
          <Button
            InputAttributes={{
              disabled: !checkDisabledButton(),
              onClick: handleLogin,
            }}
          >
            Đăng nhập
          </Button>
          <Button className="bg-[#27ae60] ml-4">Đăng ký</Button>
        </div>
        <span className="w-full text-orange-400 text-center">{errorMessage}</span>
      </div>
    </div>
  );
}

export default Login;
