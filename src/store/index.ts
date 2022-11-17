import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import sliceBoards from './sliceBoards';

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: sliceBoards,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
