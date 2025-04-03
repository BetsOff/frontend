import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LeagueState {
  league: League | null;
}

const initialLeagueState: LeagueState = {
  league: null,
};

const leagueSlice = createSlice({
  name: 'league',
  initialState: initialLeagueState,
  reducers: {
    setLeague: (state, action: PayloadAction<League>) => {
      state.league = action.payload;
    },
    resetLeague: () => initialLeagueState,    
  },
});

export const { setLeague, resetLeague } = leagueSlice.actions;
export default leagueSlice.reducer;
