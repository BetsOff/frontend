import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedLeagueState {
  league: League | null;
}

const initialLeagueState: SelectedLeagueState = {
  league: null,
};

const selectedLeagueSlice = createSlice({
  name: 'selectedLeague',
  initialState: initialLeagueState,
  reducers: {
    setSelectedLeague: (state, action: PayloadAction<League>) => {
      state.league = action.payload;
    },
    resetSelectedLeague: () => initialLeagueState,    
  },
});

export const { setSelectedLeague, resetSelectedLeague } = selectedLeagueSlice.actions;
export default selectedLeagueSlice.reducer;
