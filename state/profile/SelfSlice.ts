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
  logo: Logo;
  username: string;
  stats: Stats | null;
}

const initialProfileState: ProfileState = {
  user_id: 0,
  logo: {
    color: '',
    bg_color: '',
    icon: '',
  },
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
      state.logo = action.payload.logo;
      state.username = action.payload.username;
      state.stats = action.payload.stats;
    },
    setLogo: (state, action: PayloadAction<Logo>) => {
      state.logo = action.payload;
    },
    resetProfile: () => initialProfileState
  },
});

export const { setUserId, setProfile, setLogo, resetProfile } = SelfSlice.actions;
export default SelfSlice.reducer;
