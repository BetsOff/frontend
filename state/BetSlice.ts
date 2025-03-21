import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BetState {
  playerOneBetList: LeagueBets[];
  playerTwoBetList: LeagueBets[];
}

const initialBetState: BetState = {
  playerOneBetList: [],
  playerTwoBetList: [],
};

const betSlice = createSlice({
  name: 'bet',
  initialState: initialBetState,
  reducers: {
    setPlayerOneBets: (state, action: PayloadAction<LeagueBets[]>) => {
      state.playerOneBetList = action.payload;
    },
    setPlayerTwoBets: (state, action: PayloadAction<LeagueBets[]>) => {
      state.playerTwoBetList = action.payload;
    },
    resetBets: (state) => {
      state = initialBetState;
    },
  },
});

export const { setPlayerOneBets, setPlayerTwoBets, resetBets } = betSlice.actions;
export default betSlice.reducer;
