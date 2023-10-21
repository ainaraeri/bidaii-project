import { combineReducers } from 'redux';
import App from '../components/app';
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.querySelector('.app-wrapper'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootReducer = combineReducers({
  state: (state = {}) => state
});

export default rootReducer;
