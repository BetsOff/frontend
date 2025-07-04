import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Stats {
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

const ProfileSlice = createSlice({
  name: 'profile',
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
    resetProfile: () => initialProfileState
  },
});



export const { setUserId, setProfile, resetProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
