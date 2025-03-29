import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import leagueReducer from "./LeagueSlice";
import seasonReducer from "./SeasonSlice";
import matchReducer from "./MatchSlice";
import betReducer from "./BetSlice";
import lineReducer from "./LineSlice";
import profileReducer from "./profile/ProfileSlice";
import selfReducer from "./profile/SelfSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    league: leagueReducer,
    season: seasonReducer,
    match: matchReducer,
    bet: betReducer,
    line: lineReducer,
    profile: profileReducer,
    self: selfReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;