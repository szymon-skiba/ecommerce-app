import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './service/auth/AuthContextProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <GoogleOAuthProvider clientId="751374926344-svrk27p6vtj5ivr88qa0rgourd5tqadh.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
