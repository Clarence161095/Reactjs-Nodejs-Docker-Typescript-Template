/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import { useCheckRole } from '../hooks/checkRole.hook';
import Login from '../pages/auth/Login.component';
import Loading from '../pages/common/Loading.component';
import NotFoundCmp from '../pages/common/NotFound.component';
import Home from '../pages/home/Home.component';

function RootRouter() {
  const [checkRole] = useCheckRole();

  return (
    <Routes>
      {checkRole('general') && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} />
        </>
      )}
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      {!checkRole('general') && <Route path="*" element={<Login />} />}
    </Routes>
  );
}

export default RootRouter;
