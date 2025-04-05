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
import { authQueryKey } from "./authQueries";

export const useLeagues = () => {
  const userId = storageGetItem('user_id') || '';
  const dispatch = useDispatch();

  return useQuery({
    queryKey: [authQueryKey, queryKeys.leagues],
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
  return async () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.seasons],
      exact: false,
    });
  }
}
