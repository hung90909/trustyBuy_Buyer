import {combineReducers} from '@reduxjs/toolkit';
import chat from './chat';
import address from './address';
const appReducer = combineReducers({
  chat,
  address,
});

export default appReducer;
