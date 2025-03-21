import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import leagueReducer from "./league/LeagueSlice";
import seasonReducer from "./season/SeasonSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    league: leagueReducer,
    season: seasonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;