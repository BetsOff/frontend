import { storageGetItem } from "@/util/Storage"
import { useQuery, useQueryClient } from "react-query";
import queryKeys from "./queryKeys";
import { getRequest } from "./methods";
import apiRoutes from "@/routes/apiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setSelectedLeague } from "@/state/LineSlice";
import { useEffect, useMemo } from "react";
import { setLeague } from "@/state/leagueSlice";

export const useLeagues = () => {
  const userId = storageGetItem('user_id') || '';
  const dispatch = useDispatch();

  return useQuery({
    queryKey: [queryKeys.leagues, userId],
    queryFn: () => getLeagues(userId),
    staleTime: 1000 * 60 * 5,
    onSuccess: (leagues) => {
      if (leagues.length > 0) {
        dispatch(setLeague(leagues[0]));
      }
    },
  });
}

export const useSelectedLeague = () => {
  const { isLoading, error } = useLeagues();
  const selectedLeague = useSelector((state: RootState) => state.league.league);
  return { data: selectedLeague, isLoading, error };
}

export const getLeagues = (userId: string) => {
  return getRequest(apiRoutes.league.get, { user_id: userId });
}

export const invalidateLeagues = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: [queryKeys.leagues, storageGetItem('user_id')]
  });
}
