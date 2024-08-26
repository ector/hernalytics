// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import surveysReducer from "./slices/dashboardSurvey"

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: surveysReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
