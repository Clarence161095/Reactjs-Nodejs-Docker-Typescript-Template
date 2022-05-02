import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import LoadingPage from './pages/Loading.component';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <React.Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Suspense>
  </RecoilRoot>
);
