import { yupResolver } from '@hookform/resolvers/yup';
import { unwrapResult } from '@reduxjs/toolkit';
import FormInput from 'components/atoms/form-input/FormInput';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from 'store/slice/UserSlice';
import * as yup from 'yup';
import './Login.scss';

const SignupSchema = yup.object().shape({
  mail: yup.string().required().email(),
  password: yup.string().required(),
});

function Login() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [errorLogin, setErrorLogin] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const actionResult = await dispatch(
        login({ username: data.mail, password: data.password }),
      );
      unwrapResult(actionResult);
      history('/dashboard')
    } catch (error) {
      setErrorLogin(error.message)
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label='Email'
          name='mail'
          register={register}
          errors={errors}
        />

        <FormInput
          label='Password'
          name='password'
          register={register}
          errors={errors}
          type='password'
        />

        <input type='submit' value='Login' />
        {errorLogin && <p>{errorLogin}</p>}
      </form>
    </div>
  );
}

export default Login;
