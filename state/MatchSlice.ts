import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MatchState {
  matches: MatchSet | null;
  currentMatch: Match | null;
}

const initialMatchState: MatchState = {
  matches: null,
  currentMatch: null,
};

const matchSlice = createSlice({
  name: 'match',
  initialState: initialMatchState,
  reducers: {
    setMatches: (state, action: PayloadAction<MatchSet>) => {
      state.matches = action.payload
      if (state.matches.matches.length > 0) state.currentMatch = state.matches.matches[0];
    },
    setCurrentMatch: (state, action: PayloadAction<Match>) => {
      state.currentMatch = action.payload;
    },
    resetMatches: (state) => {
      state = initialMatchState;
    },
  },
});

export const { setMatches, setCurrentMatch, resetMatches } = matchSlice.actions;
export default matchSlice.reducer;
