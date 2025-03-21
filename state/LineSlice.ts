import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedLine {
  market: string;
  id: number;
  first_selection_picked: boolean;
  wager: number;
}

interface LineState {
  selectedLeague: string;
  selectedLine: SelectedLine | null;
}

// TODO: Dynamically determine selected league based on what's in season
const initialLineSlice: LineState = {
  selectedLeague: 'MLB',
  selectedLine: null,
};

const validLeagues = ['MLB', 'NFL', 'NBA', 'NHL'];

const lineSlice = createSlice({
  name: 'line',
  initialState: initialLineSlice,
  reducers: {
    setSelectedLeague: (state, action: PayloadAction<string>) => {
      if (!validLeagues.includes(action.payload)) return;
      state.selectedLeague = action.payload;
    },
    setSelectedLine: (state, action: PayloadAction<SelectedLine>) => {
      state.selectedLine = action.payload;
    },
    setWager: (state, action: PayloadAction<number>) => {
      if (!state.selectedLine) return;
      state.selectedLine.wager = action.payload;
    },
    resetSelectedLine: (state) => {
      state.selectedLine = null;
    }
  }
});

export const { setSelectedLeague, setSelectedLine, setWager, resetSelectedLine } = lineSlice.actions;
export default lineSlice.reducer;
