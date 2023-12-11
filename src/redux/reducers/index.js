import {combineReducers} from '@reduxjs/toolkit';
import user from './user';
import chat from './chat';
import address from './address';

const appReducer = combineReducers({
  user,
  chat,
  address,
});

export default appReducer;
