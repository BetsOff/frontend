import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import queryKeys from "./queryKeys";
import { setMatch, setMatchSet } from "@/state/MatchSlice";
import { getRequest } from "./methods";
import apiRoutes from "@/routes/apiRoutes";
import { RootState } from "@/state/store";
import { useSelectedSeason } from "./seasonQueries";

export const useMatches = () => {
  const dispatch = useDispatch();
  const { matchNumber, playoff } = useSelector((state: RootState) => state.match)
  const { data: season } = useSelectedSeason();

  return useQuery({
    queryKey: [queryKeys.matches, matchNumber, playoff],
    queryFn: () => getMatches(undefined, season?.id, matchNumber, playoff),
    staleTime: 1000 * 60 * 5,
    enabled: !!season?.id,
    onSuccess: (matches) => {
      if (matches?.matches.length || 0 > 0) {
        const currentMatch = matches.matches[0];
        dispatch(setMatch(currentMatch.id));
        dispatch(setMatchSet([currentMatch.match_number, currentMatch.playoff]))
      }
    }
  });
}

export const useSelectedMatch = (
  match_id: number | undefined,
) => {
  const dispatch = useDispatch();
  
  return useQuery({
    queryKey: [queryKeys.matches, match_id],
    queryFn: () => getMatches(match_id),
    staleTime: 1000 * 60 * 5,
    enabled: !!match_id,
    onSuccess: (matches) => {

    }
  })
}

// export const useSelectedMatch = () => {
//   const { data: matches, isLoading, error } = useMatches();
//   const dispatch = useDispatch();
//   const selectedMatch = useSelector((state: RootState) => state.match.match);
//   if (matches && !selectedMatch) {
//     dispatch(setMatch(matches.matches[0]));
//   }
//   console.log(selectedMatch);
//   return { data: selectedMatch, isLoading, error };
// }

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

export const invalidateMatches = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: [queryKeys.matches],
    exact: false,
  })
}
