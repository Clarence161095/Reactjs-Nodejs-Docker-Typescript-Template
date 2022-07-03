/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import { LoadingCmp } from '../components/Material.component';
import { useCheckRole } from '../hooks/checkRole.hook';
import Login from '../pages/auth/Login.component';
import Loading from '../pages/common/Loading.component';
import Home from '../pages/home/Home.component';

function RootRouter() {
  const [checkRole] = useCheckRole();

  return (
    <Routes>
      {checkRole('general') && (
        <>
          <Route path="/home" element={<Home />} />
        </>
      )}
      <Route path="*" element={<Login />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default RootRouter;
