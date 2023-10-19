import { combineReducers } from 'redux';
import App from '../components/app';

const rootReducer = combineReducers({
  state: (state = {}) => state
});

export default rootReducer;