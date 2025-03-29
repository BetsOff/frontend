import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Stats {
  lifetime_record: MatchRecord;
  recent_championships: string[];
  head_to_head: MatchRecord;
  bet_accuracy: AccuracyRef;
  best_game: {
    league: string;
    season: number;
    match: Match;
  };
}

interface ProfileStatsState {
  user_id: number;
  stats: Stats | null;
}

const initialProfileStatsState: ProfileStatsState = {
  user_id: 0,
  stats: null,
};

const ProfileStatsSlice = createSlice({
  name: 'profileStats',
  initialState: initialProfileStatsState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.user_id = action.payload;
    },
    setProfileStats: (state, action: PayloadAction<Stats>) => {
      state.stats = action.payload;
    },
    resetProfileStats: (state) => {
      state = initialProfileStatsState;
    },
  },
});

export const { setUserId, setProfileStats, resetProfileStats } = ProfileStatsSlice.actions;
export default ProfileStatsSlice.reducer;
