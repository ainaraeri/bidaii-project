import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom'; // Import ReactDOM
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

import './style/main.scss';

axios.defaults.withCredentials = true; // Configura withCredentials


function main() {
  const root = createRoot(document.querySelector('.app-wrapper')); // Use ReactDOM.createRoot
  root.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

document.addEventListener('DOMContentLoaded', main);
