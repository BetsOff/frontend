import { useQuery, useQueryClient } from "react-query"
import queryKeys from "./queryKeys"
import { getRequest } from "./methods"
import apiRoutes from "@/routes/apiRoutes"
import { setSeason } from "@/state/SeasonSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/state/store"
import { useSelectedLeague } from "./leagueQueries"

export const useSeasons = () => {
  const dispatch = useDispatch();
  const { data: league } = useSelectedLeague();

  return useQuery({
    queryKey: [queryKeys.seasons],
    queryFn: () => getSeasons(league?.id),
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
  const { isLoading, error } = useSeasons();
  const selectedSeason = useSelector((state: RootState) => state.season.season);
  return { data: selectedSeason, isLoading, error };
}

export const useStandings = () => {
  const { data: season } = useSelectedSeason();

  return useQuery({
    queryKey: [queryKeys.seasons, queryKeys.standings, season?.id],
    queryFn: () => getStandings(season?.id),
    staleTime: 1000 * 60 * 5,
    enabled: !!season?.id,
    onSuccess: (standings: Standing[]) => {

    },
  })
}

export const getSeasons = (leagueId: number | undefined) => {
  return getRequest(apiRoutes.season.get, { league_id: leagueId || 0 });
}

export const getStandings = (seasonId: number | undefined) => {
  return getRequest(apiRoutes.season.standings, { season_id: seasonId });
}

export const invalidateSeasons = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: [queryKeys.seasons],
    exact: false,
  });
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
