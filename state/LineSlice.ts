import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedLine {
  market: string;
  id: number;
  first_selection_picked: boolean;
  wager: number;
}

export interface LineState {
  selectedLeague: string;
  selectedLine: SelectedLine | null;
  leagueChoices: string[];
  mlbLines: Line[];
  nflLines: Line[];
  nbaLines: Line[];
  nhlLines: Line[];
}

const initialLineSlice: LineState = {
  selectedLeague: '',
  selectedLine: null,
  leagueChoices: [],
  mlbLines: [],
  nflLines: [],
  nbaLines: [],
  nhlLines: [],
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
    },
    setMlbLines: (state, action: PayloadAction<Line[]>) => {
      const lines = action.payload;
      state.mlbLines = action.payload;
      if (lines.length > 0) {
        state.selectedLeague = 'MLB';
        state.leagueChoices = [...new Set([...state.leagueChoices, 'MLB'])];
      }
    },
    setNflLines: (state, action: PayloadAction<Line[]>) => {
      const lines = action.payload;
      state.nflLines = action.payload;
      if (lines.length > 0) {
        state.selectedLeague = 'NFL';
        state.leagueChoices = [...new Set([...state.leagueChoices, 'NFL'])];
      }
    },
    setNbaLines: (state, action: PayloadAction<Line[]>) => {
      const lines = action.payload;
      state.nbaLines = action.payload;
      if (lines.length > 0) {
        state.selectedLeague = 'NBA';
        state.leagueChoices = [...new Set([...state.leagueChoices, 'NBA'])];
      }
    },
    setNhlLines: (state, action: PayloadAction<Line[]>) => {
      const lines = action.payload;
      state.nhlLines = action.payload;
      if (lines.length > 0) {
        state.selectedLeague = 'NHL';
        state.leagueChoices = [...new Set([...state.leagueChoices, 'NHL'])];
      }
    },
    resetLines: (state) => {
      state.mlbLines = [];
      state.nflLines = [];
      state.nbaLines = [];
      state.nhlLines = [];
      state.leagueChoices = [];
    }
  }
});

export const { 
  setSelectedLeague,
  setSelectedLine,
  setWager,
  resetSelectedLine,
  setMlbLines,
  setNflLines,
  setNbaLines,
  setNhlLines,
  resetLines,
} = lineSlice.actions;
export default lineSlice.reducer;
