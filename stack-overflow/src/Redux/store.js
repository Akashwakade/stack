
import { legacy_createStore, combineReducers } from 'redux';
import userReducer from './authentication/UserReducer';


const rootReducer = combineReducers({
  user: userReducer,
});

const store = legacy_createStore(rootReducer);

export default store;
