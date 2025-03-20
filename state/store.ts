import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import leagueReducer from "./league/LeagueSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    league: leagueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;