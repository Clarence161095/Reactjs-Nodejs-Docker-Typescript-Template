import React from 'react';
import { useSelector } from 'react-redux';
import LocalStorageService from 'utils/LocalStorageService';
import InsideRouter from './InsideRouter';
import OutsideRouter from './OutsideRouter';

function AppRouter() {
  useSelector((state) => state.user)
  const token = LocalStorageService.getToken();
  if (token) {
    return (
      <InsideRouter />
    );
  }

  return (
    <OutsideRouter />
  )
}

export default AppRouter;