type Standing = {
  win: number;
  loss: number;
  draw: number;
  pf: number;
  diff: number;
  clinch: string | null;
  user: string;
  user_id: number;
  playoff_odds: number;
  logo: Logo;
}

type Logo = {
  color: string;
  bg_color: string;
  icon: string;
}
