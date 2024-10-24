import { configureStore } from '@reduxjs/toolkit';
import createReducer from '../reducer/reducer';
const store = configureStore({
  reducer: {
    counter: createReducer,
  },
});

export default store;
