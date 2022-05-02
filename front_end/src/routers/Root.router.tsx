/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom';
import { useLoggedHook } from '../hooks/logged.hook';
import Home from '../pages/Home.component';
import Loading from '../pages/Loading.component';
import Login from '../pages/Login.component';

function RootRouter() {
  const [loggedState] = useLoggedHook();

  const checkRole = (type: string) => {
    switch (type) {
      case 'general':
        return loggedState?.role === 'user' || loggedState?.role === 'admin';
      default:
        return false;
    }
  };

  return (
    <Routes>
      {checkRole('general') && (
        <>
          <Route path="/home" element={<Home />} />
        </>
      )}
      <Route path="*" element={<Home />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default RootRouter;
