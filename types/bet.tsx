type Wager = {
    market: string;
    first_selection: string;
    second_selection: string;
    first_price: number;
    second_price: number;
    point: number | null;
    first_selection_picked: boolean;
    wager: number;
    points_earned: number;
}

type Game = {
    home_team: string;
    away_team: string
    home_tag: string;
    away_tag: string;
    start_time: string;
    status: string;
    home_score: number;
    away_score: number;
    wagers: Wager[];
}

type LeagueBets = {
    league_name: string;
    games: Game[];
}
