import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SeasonState {
  season: Season | null;
}

const initialSeasonState: SeasonState = {
  season: null,
};

const seasonSlice = createSlice({
  name: 'season',
  initialState: initialSeasonState,
  reducers: {
    setSeason: (state, action: PayloadAction<Season>) => {
      state.season = action.payload;
    },
    resetSeason: (state) => initialSeasonState,
  },
});

export const { setSeason, resetSeason } = seasonSlice.actions;
export default seasonSlice.reducer;