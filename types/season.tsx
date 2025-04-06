type Season = {
  id: number;
  champion: string | null;
  league: number;
  season_number: number;
  start_date: string;
  end_date: string;
  num_matches: number;
  matchup_length: number;
  break_length: number;
  scoring_type: string;
  bets_per_match: number | null;
  credits_per_match: number | null;
  teams_in_playoffs: number;
}