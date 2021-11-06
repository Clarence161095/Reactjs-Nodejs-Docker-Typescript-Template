import { useAppSelector } from 'hooks/hooks';
import React from 'react';
import LocalStorageService from 'utils/LocalStorageService';
import InsideRouter from './InsideRouter';
import OutsideRouter from './OutsideRouter';

function AppRouter() {
  useAppSelector((state) => state.user)
  
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