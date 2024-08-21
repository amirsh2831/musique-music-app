// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../PlayerSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

