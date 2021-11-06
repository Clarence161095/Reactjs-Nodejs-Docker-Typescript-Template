import NotFound from 'components/not-found/NotFound';
import Dashboard from 'features/dashboard/Dashboard';
import Login from 'features/login/Login';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function InsideRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default InsideRouter;