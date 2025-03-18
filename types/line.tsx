type Line = {
  game_id: string;
  start_time: string;
  league: string;
  league_key: string;
  home_team: string;
  home_score: number;
  home_tag: string;
  away_team: string;
  away_score: number;
  away_tag: string;
  status: string;
  lines: MarketLine[];
}

type MarketLine = {
  id: number;
  market: string;
  first_selection: string;
  second_selection: string;
  first_price: number;
  second_price: number;
  point: number | null;
}