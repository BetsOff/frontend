import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Stats {
  lifetime_record: MatchRecord;
  recent_championships: string[];
  head_to_head: MatchRecord | null;
  bet_accuracy: AccuracyRef;
  best_game: {
    league: string;
    season: number;
    match: Match;
  };
}

interface ProfileState {
  user_id: number;
  color: string;
  username: string;
  stats: Stats | null;
}

const initialProfileState: ProfileState = {
  user_id: 0,
  color: '',
  username: '',
  stats: null,
};

const SelfSlice = createSlice({
  name: 'self',
  initialState: initialProfileState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.user_id = action.payload;
    },
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      state.user_id = action.payload.user_id;
      state.color = action.payload.color;
      state.username = action.payload.username;
      state.stats = action.payload.stats;
      console.log(state);
    },
    resetProfile: () => initialProfileState
  },
});

export const { setUserId, setProfile, resetProfile } = SelfSlice.actions;
export default SelfSlice.reducer;
