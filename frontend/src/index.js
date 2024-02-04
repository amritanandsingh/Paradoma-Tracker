import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-7d0ygutb8yledbnb.us.auth0.com"
      clientId="sr90NTWpUqYxMBupqN2L8HRDz4rDbAyM"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
      <App />
    </Auth0Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

