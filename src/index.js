import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './components';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './components/GlobalStyle';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle/>
    <App />
    </Provider>
  </React.StrictMode>
);
