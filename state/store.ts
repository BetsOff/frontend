import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import leagueReducer from "./LeagueSlice";
import seasonReducer from "./SeasonSlice";
import matchReducer from "./MatchSlice";
import betReducer from "./BetSlice";
import lineReducer from "./LineSlice";
import profileStatsReducer from "./ProfileStatsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    league: leagueReducer,
    season: seasonReducer,
    match: matchReducer,
    bet: betReducer,
    line: lineReducer,
    profileStats: profileStatsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;