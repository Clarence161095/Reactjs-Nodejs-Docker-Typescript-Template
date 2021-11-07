import { yupResolver } from '@hookform/resolvers/yup';
import { unwrapResult } from '@reduxjs/toolkit';
import { Checkbox, Divider, Space, Button } from 'antd';
import FormInput from 'components/elements/form-input/FormInput';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from 'store/slice/UserSlice';
import LocalStorageService from 'utils/LocalStorageService';
import * as yup from 'yup';
import './Login.scss';


const SignInSchema = yup.object().shape({
  mail: yup.string().required().email(),
  password: yup.string().required(),
});

let InitializeRememberMe = { username: '', password: '' }

if (LocalStorageService.getBoolean('remember_me_flag')) {
  InitializeRememberMe = LocalStorageService.getDecodeObject('remember_me');
}

function Login() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [errorLogin, setErrorLogin] = useState('')
  const [rememberMe, setRememberMe] = useState(InitializeRememberMe)
  const [rememberMeChecked, setRememberMeChecked] = useState(false);

  const {
    control,
    handleSubmit,
  } = useForm({ resolver: yupResolver(SignInSchema), });

  useEffect(() => {
    if (LocalStorageService.getBoolean('remember_me_flag')) {
      setRememberMe(LocalStorageService.getDecodeObject('remember_me'));
      setRememberMeChecked(LocalStorageService.getBoolean('remember_me_flag'))
    }
  }, [])

  const onSubmit = async (data: any) => {
    try {
      //If remember_me_flag is true save the username and password to localStorage (encrypted).
      if (LocalStorageService.getBoolean('remember_me_flag')) {
        LocalStorageService.setEncode('remember_me', { username: data.mail, password: data.password })
      } else {
        localStorage.removeItem('remember_me');
      }

      const actionResult = await dispatch(
        login({ username: data.mail, password: data.password }),
      );

      unwrapResult(actionResult);
      history('/dashboard');
      window.location.reload();
    } catch (error: any) {
      setErrorLogin(error.message)
    }
  };

  function onChangeKeepLogin(e: any) {
    setRememberMeChecked(e.target.checked)
    localStorage.setItem('remember_me_flag', e.target.checked)
  }

  return (
    <div className='login'>
      <div className='login__login-form'>

        <div className='login__login-form__title'>
          <h2 className='login__login-form__title__header'>Welcome back,</h2>
          <p className='login__login-form__title__description'>Please sign in to your account below.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='login__login-form__content'>

            <FormInput
              name='mail'
              control={control}
              input={{
                placeholder: 'Email here...',
                type: 'email',
                size: 'large',
                defaultValue: rememberMe?.username
              }}
            />

            <FormInput
              name='password'
              control={control}
              input={{
                placeholder: 'Password here...',
                type: 'password',
                size: 'large',
                defaultValue: rememberMe?.password
              }}
            />

            <Checkbox
              className='login__login-form__content__remember-me'
              onChange={onChangeKeepLogin}
              checked={rememberMeChecked}>
              Remember me
            </Checkbox>

            <Divider className='login__login-form__content__divider' />

            <Space className='login__login-form__content__sign-up'>
              No account?
              <Button
                type='link'
                className='login__login-form__content__sign-up__btn'
              >
                Sign up now
              </Button>
            </Space>
          </div>

          <div className='login__login-form__footer'>
            <Space direction='horizontal'>
              <Button
                type='link'
              >
                Recover Password
              </Button>

              <button
                type='submit'
                className='login__login-form__footer__btn-login'>
                Login to Dashboard
              </button>

              {errorLogin && <p>{errorLogin}</p>}
            </Space>
          </div>


        </form>
      </div>
    </div>
  );
}

export default Login;
