import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import columnDataSilce from './columnDataSlice';
import sliceBoards from './sliceBoards';

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: sliceBoards,
    columnData: columnDataSilce,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
