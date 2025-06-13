import { configureStore } from '@reduxjs/toolkit';
import flowReducer from './flowDesignerSlice';

export const store = configureStore({
  reducer: {
    flowDesigner: flowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
