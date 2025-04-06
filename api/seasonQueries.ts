import { useQuery, useQueryClient } from "react-query"
import queryKeys from "./queryKeys"
import { getRequest } from "./methods"
import apiRoutes from "@/routes/apiRoutes"
import { resetSeason, setSeason } from "@/state/SeasonSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/state/store"
import { useSelectedLeague } from "./leagueQueries"
import { authQueryKey } from "./authQueries"

export const useSeasons = () => {
  const dispatch = useDispatch();
  const { data: league } = useSelectedLeague();

  return useQuery({
    queryKey: [authQueryKey, queryKeys.leagues, queryKeys.seasons],
    queryFn: () => getSeasons(league!.id),
    staleTime: 1000 * 60 * 5,
    enabled: !!league?.id,
    onSuccess: (seasons) => {
      if (seasons?.length || 0 > 0) {
        dispatch(setSeason(seasons[0]));
      }
    },
  });
}

export const useSelectedSeason = () => {
  const { isLoading, error, refetch } = useSeasons();
  const selectedSeason = useSelector((state: RootState) => state.season.season);
  return { data: selectedSeason, isLoading, error, refetch };
}

export const useStandings = () => {
  const { data: season } = useSelectedSeason();

  return useQuery({
    queryKey: [authQueryKey, queryKeys.leagues, queryKeys.seasons, queryKeys.standings, season?.id],
    queryFn: () => getStandings(season?.id),
    staleTime: 1000 * 60 * 5,
    enabled: !!season?.id,
    onSuccess: (standings: Standing[]) => {

    },
  })
}

export const getSeasons = (leagueId: number ) => {
  return getRequest(apiRoutes.season.get, { league_id: leagueId });
}

export const getStandings = (seasonId: number | undefined) => {
  return getRequest(apiRoutes.season.standings, { season_id: seasonId });
}

export const useInvalidateSeasons = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return async () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.seasons],
      exact: false,
    });
    dispatch(resetSeason());
  }
}

export const useInvalidateStandings = () => {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.standings],
      exact: false,
    });
  }
}
