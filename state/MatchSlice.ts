import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface MatchState {
  matchId: number | undefined;
  matchNumber: number | undefined;
  playoff: boolean | undefined
}

const initialMatchState: MatchState = {
  matchId: undefined,
  matchNumber: undefined,
  playoff: undefined,
};

const matchSlice = createSlice({
  name: 'match',
  initialState: initialMatchState,
  reducers: {
    setMatch: (state, action: PayloadAction<number>) => {
      state.matchId = action.payload;
    },
    setMatchSet: (state, action: PayloadAction<[number, boolean]>) => {
      const [matchNumber, playoff] = action.payload;
      state.matchNumber = matchNumber;
      state.playoff = playoff;
    },
    resetMatches: (state) => initialMatchState,
  },
});

export const useMatchSelector = () => {
  return useSelector((state: RootState) => state.match)
}

export const { setMatch, setMatchSet, resetMatches } = matchSlice.actions;
export default matchSlice.reducer;
