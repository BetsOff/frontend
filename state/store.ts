import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import leagueReducer from "./LeagueSlice";
import seasonReducer from "./SeasonSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    league: leagueReducer,
    season: seasonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;