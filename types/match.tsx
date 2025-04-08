type MatchParticipant = {
  user_id: number;
  user: string;
  logo: {
    color: string;
    bg_color: string;
    icon: string;
  };
  record: string;
  credits_remaining: number;
  chance_of_winning: number;
  score: number;
}

type Match = {
  match_number: number;
  playoff: boolean;
  start_date: string;
  end_date: string;
  match_id: number;
  winner: string | null;
  participants: MatchParticipant[];
}

type MatchSet = {
  match_number: number;
  num_regular_season_matches: number;
  num_playoff_matches: number;
  playoff: boolean;
  round_name: string | null;
  status: string;
  start_date: string;
  end_date: string;
  starting_credits: number;
  matches: Match[];
}

interface MatchRecord {
  win: number;
  loss: number;
  draw: number
}