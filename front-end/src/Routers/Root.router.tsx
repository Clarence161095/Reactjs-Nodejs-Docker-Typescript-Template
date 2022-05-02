/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom';
import LoadingPage from '../components/loadingPage.component';
import { useLoggedHook } from '../hooks/logged.hook';
import CreateSet from '../pages/CreateSet.component';
import Home from '../pages/Home.component';
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
          <Route path="/create_set" element={<CreateSet />} />
        </>
      )}
      <Route path="*" element={<Home />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default RootRouter;
