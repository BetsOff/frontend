import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LeagueState {
  leagues: League[];
  currentLeague: League | null;
}

const initialLeagueState: LeagueState = {
  leagues: [],
  currentLeague: null,
};

const leagueSlice = createSlice({
  name: 'league',
  initialState: initialLeagueState,
  reducers: {
    setLeagues: (state, action: PayloadAction<League[]>) => {
      state.leagues = action.payload;
      if (state.leagues.length > 0) state.currentLeague = state.leagues[0];
    },
    setCurrentLeague: (state, action: PayloadAction<League>) => {
      state.currentLeague = action.payload;
    },
    resetLeagues: (state) => {
      state = initialLeagueState;
    },
  },
});

export const { setLeagues, setCurrentLeague, resetLeagues } = leagueSlice.actions;
export default leagueSlice.reducer;