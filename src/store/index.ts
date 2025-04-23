import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import decisionTreeReducer from './slices/decisionTreeSlice';
import uiReducer from './slices/uiSlice';

export const makeStore = () => 
  configureStore({
    reducer: {
      decisionTree: decisionTreeReducer,
      ui: uiReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV !== 'production' }); 