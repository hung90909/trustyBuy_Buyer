import {combineReducers} from '@reduxjs/toolkit';
import chat from './chat';

const appReducer = combineReducers({
  chat,
});

export default appReducer;
