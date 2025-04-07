import { storageGetItem } from "@/util/Storage"
import { useQuery, useQueryClient } from "react-query";
import queryKeys from "./queryKeys";
import { getRequest } from "./methods";
import apiRoutes from "@/routes/apiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setLeague } from "@/state/leagueSlice";
import { authQueryKey } from "./authQueries";
import { resetSeason } from "@/state/SeasonSlice";

export const useLeagues = () => {
  const userId = storageGetItem('user_id') || '';
  const dispatch = useDispatch();

  return useQuery({
    queryKey: [authQueryKey, queryKeys.leagues],
    queryFn: () => getLeagues(userId),
    staleTime: 1000 * 60 * 5,
    onSuccess: (leagues) => {
      if (leagues && leagues.length > 0) {
        dispatch(setLeague(leagues[0]));
      }
    },
    onError: () => {
      console.log('error');
    },
  });
}

export const useSelectedLeague = () => {
  const { isLoading, error } = useLeagues();
  const selectedLeague = useSelector((state: RootState) => state.league.league);
  return { data: selectedLeague, isLoading, error };
}

export const useMembers = () => {
  const { data: league } = useSelectedLeague();

  return useQuery({
    queryKey: [authQueryKey, queryKeys.leagues, queryKeys.members],
    queryFn: () => getMembers(league!.id),
    staleTime: 1000 * 60 * 5,
    enabled: !!league?.id,
    onSuccess: () => {

    },
  })
}

export const getLeagues = (userId: string) => {
  return getRequest(apiRoutes.league.get, { user_id: userId });
}

export const getMembers = (leagueId: number) => {
  return getRequest(apiRoutes.league.getUsers, { league_id: leagueId })
}

export const useInvalidateLeagues = () => {
  const queryClient = useQueryClient();
  return async () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.leagues],
      exact: false,
    });
  }
}

export const useInvalidateSelectedLeague = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return async () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.seasons, queryKeys.members],
      exact: false,
    });
    dispatch(resetSeason());
  }
}
