import { RootState } from "@/state/store"
import { useSelector } from "react-redux"
import { useSelectedMatch } from "./matchQueries"
import { useQuery } from "react-query"
import queryKeys from "./queryKeys"
import { getRequest } from "./methods"
import apiRoutes from "@/routes/apiRoutes"
import { authQueryKey } from "./authQueries"

export type PlayerIndex = 0 | 1

export const useBets = (playerIndex: PlayerIndex) => {
  const { matchId } = useSelector((state: RootState) => state.match);
  const { data: match } = useSelectedMatch(matchId);
  
  const userId = match?.matches[0].participants[playerIndex].user_id;

  return useQuery({
    queryKey: [authQueryKey, queryKeys.bets, matchId, playerIndex],
    queryFn: () => getBets(matchId, userId),
    staleTime: 1000 * 60 * 5,
    enabled: !!matchId && !!userId,
    onSuccess: (bets: LeagueBets[]) => {

    },
  });
}

export const getBets = (
  matchId: number | undefined, 
  userId: number | undefined,
) => {
  return getRequest(apiRoutes.bet.get, { match_id: matchId, user_id: userId });
}

