import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import queryKeys from "./queryKeys";
import { setMatch, setMatchSet } from "@/state/MatchSlice";
import { getRequest } from "./methods";
import apiRoutes from "@/routes/apiRoutes";
import { RootState } from "@/state/store";
import { useSelectedSeason } from "./seasonQueries";
import { authQueryKey } from "./authQueries";

export const useMatches = () => {
  const dispatch = useDispatch();
  const { matchNumber, playoff } = useSelector((state: RootState) => state.match)
  const { data: season } = useSelectedSeason();

  return useQuery({
    queryKey: [authQueryKey, queryKeys.matches, matchNumber, playoff],
    queryFn: () => getMatches(undefined, season?.id, matchNumber, playoff),
    staleTime: 1000 * 60 * 5,
    enabled: !!season?.id,
    onSuccess: (matches) => {
      if (matches?.matches.length || 0 > 0) {
        const currentMatch = matches.matches[0];
        dispatch(setMatch(currentMatch.match_id));
        dispatch(setMatchSet([currentMatch.match_number, currentMatch.playoff]))
      }
    }
  });
}

export const useSelectedMatch = (
  matchId: number | undefined,
) => {
  const dispatch = useDispatch();
  
  return useQuery({
    queryKey: [authQueryKey, queryKeys.matches, matchId],
    queryFn: () => getMatches(matchId),
    staleTime: 1000 * 60 * 5,
    enabled: !!matchId,
    onSuccess: (matches: MatchSet) => {

    },
  });
}

export const getMatches = (
  matchId: number | undefined = undefined,
  seasonId: number | undefined = undefined,
  matchNumber: number | undefined = undefined,
  playoff: boolean | undefined = undefined,
) => {
  const queryParams = {
    ...(matchId !== undefined && { match_id: matchId }),
    ...(seasonId !== undefined && { season_id: seasonId }),
    ...(matchNumber !== undefined && { match_number: matchNumber }),
    ...(playoff !== undefined && { playoff }),
  }
  return getRequest(apiRoutes.match.get, queryParams);
}

export const useInvalidateMatches = () => {
  const queryClient = useQueryClient();
  
  return async () => {
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.matches],
      exact: false,
    });
  }
}
