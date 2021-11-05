import Login from 'features/login/Login';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function OutsideRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default OutsideRouter;