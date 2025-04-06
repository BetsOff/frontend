import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import queryKeys from "./queryKeys";
import { setMatch, setMatchDate } from "@/state/MatchSlice";
import { getRequest } from "./methods";
import apiRoutes from "@/routes/apiRoutes";
import { RootState } from "@/state/store";
import { useSelectedSeason } from "./seasonQueries";
import { authQueryKey } from "./authQueries";
import getToday from "@/util/date/getToday";

export const useMatches = () => {
  const dispatch = useDispatch();
  const { data: season } = useSelectedSeason();
  const matchDate = useSelector((state: RootState) => state.match.matchDate)

  return useQuery({
    queryKey: [authQueryKey, queryKeys.leagues, queryKeys.seasons, queryKeys.matches, season, matchDate],
    queryFn: () => getMatches(undefined, matchDate, season?.id),
    staleTime: 1000 * 60 * 5,
    enabled: !!season?.id,
    onSuccess: (matches) => {
      if (matches?.matches.length || 0 > 0) {
        const date = matches.start_date.split('T')[0]
        const [year, month, day] = date.split('-');  // Split the string by '-'
        const formattedDate = `${day}-${month}-${year}`;  // Reformat it to "DD-MM-YYYY"        
        const currentMatch = matches.matches[0];
        dispatch(setMatch(currentMatch.match_id));
        dispatch(setMatchDate(formattedDate));
      }
    }
  });
}

export const useSelectedMatch = (
  matchId: number | undefined,
) => {
  const { data: matches } = useMatches();

  return useQuery({
    queryKey: [authQueryKey, queryKeys.leagues, queryKeys.seasons, queryKeys.matches, matchId],
    queryFn: () => getMatches(matchId),
    staleTime: 1000 * 60 * 5,
    enabled: !!matchId && !!matches,
    onSuccess: (matches: MatchSet) => {

    },
  });
}

export const getMatches = (
  matchId: number | undefined = undefined,
  date: string | undefined = undefined,
  seasonId: number | undefined = undefined,
) => {
  const queryParams = {
    ...(matchId !== undefined && { match_id: matchId }),
    ...(seasonId !== undefined && { season_id: seasonId }),
    ...(date !== undefined && { date: date }),
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
