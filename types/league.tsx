type League = {
  id: number,
  name: string,
  date_created: string,
  max_players: number,
  commissioner: boolean,
  seasons: Season[],
}

type Invite = {
  id: number,
  league_name: string,
  league: number,
  date_invited: string,
}

type Member = {
  id: number,
  username: string,
  league_name: string,
  commissioner: boolean,
  join_type: string,
  accepted: boolean,
  date_invited: string,
  date_joined: string | null,
  user: number,
  league: number
}