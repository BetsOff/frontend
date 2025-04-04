import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

interface Scenario {
  playerIndex: 0 | 1;
  betId: number;
  value: number;
}

interface ScenarioState {
  playerOneWins: Record<number, number>;
  playerOneLosses: Record<number, number>;
  playerTwoWins: Record<number, number>;
  playerTwoLosses: Record<number, number>;
}
interface MatchState {
  matchId: number | undefined;
  matchNumber: number | undefined;
  playoff: boolean | undefined;
  scenario: ScenarioState;
  resetKey: number;
}

const initialScenarioState: ScenarioState = {
  playerOneWins: {},
  playerOneLosses: {},
  playerTwoWins: {},
  playerTwoLosses: {},
};

const initialMatchState: MatchState = {
  matchId: undefined,
  matchNumber: undefined,
  playoff: undefined,
  scenario: initialScenarioState,
  resetKey: 0,
};

const matchSlice = createSlice({
  name: 'match',
  initialState: initialMatchState,
  reducers: {
    setMatch: (state, action: PayloadAction<number>) => {
      state.matchId = action.payload;
      state.scenario = initialScenarioState;
    },
    setMatchSet: (state, action: PayloadAction<[number, boolean]>) => {
      const [matchNumber, playoff] = action.payload;
      state.matchNumber = matchNumber;
      state.playoff = playoff;
    },
    resetMatches: (state) => {
      state = initialMatchState;
      state.resetKey += 1;
    },
    addPlayerScore: (state, action: PayloadAction<Scenario>) => {
      const { playerIndex, betId, value } = action.payload;

      if (playerIndex === 0) {
        if (value > 0) {
          state.scenario.playerOneWins[betId] = value;
          delete state.scenario.playerOneLosses[betId];
        } else {
          state.scenario.playerOneLosses[betId] = value;
          delete state.scenario.playerOneWins[betId];
        }
      } else if (playerIndex === 1) {
        if (value > 0) {
          // Add to wins, remove from losses if exists
          state.scenario.playerTwoWins[betId] = value;
          delete state.scenario.playerTwoLosses[betId];
        } else {
          // Add to losses, remove from wins if exists
          state.scenario.playerTwoLosses[betId] = value;
          delete state.scenario.playerTwoWins[betId];
        }
      }
      
    },
    removePlayerScore: (state, action: PayloadAction<Scenario>) => {
      const { playerIndex, betId, value } = action.payload;
      delete state.scenario.playerOneWins[betId];
      delete state.scenario.playerOneLosses[betId];
      delete state.scenario.playerTwoWins[betId];
      delete state.scenario.playerTwoLosses[betId];
    },
    resetScenario: (state) => {
      console.log('resetting');
      state.scenario = initialScenarioState;
      state.resetKey += 1;
    },
  },
});

export const useMatchSelector = () => {
  return useSelector((state: RootState) => state.match)
}

export const { setMatch, setMatchSet, resetMatches, addPlayerScore, removePlayerScore, resetScenario } = matchSlice.actions;
export default matchSlice.reducer;
