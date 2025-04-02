import { storageGetItem } from "@/util/Storage"
import { useQuery, useQueryClient } from "react-query";
import queryKeys from "./queryKeys";
import { getRequest } from "./methods";
import apiRoutes from "@/routes/apiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setSelectedLeague } from "@/state/LineSlice";
import { useEffect, useMemo } from "react";

export const useLeagues = () => {
  const userId = storageGetItem('user_id') || '';

  return useQuery({
    queryKey: [queryKeys.leagues, userId],
    queryFn: () => getLeagues(userId),
    staleTime: 1000 * 60 * 5
  });
}

export const useSelectedLeague = () => {
  const dispatch = useDispatch();
  const selectedLeague = useSelector((state: RootState) => state.selectedLeague.league);
  const { data: leagues, isLoading, error } = useLeagues();

  const league = useMemo(() => (leagues?.length 
    ? leagues[0] 
    : null
  ), [leagues]);

  useEffect(() => {
    if (!selectedLeague && league) {
      dispatch(setSelectedLeague(league));
    }
  }, [selectedLeague, league, dispatch]);

  return { data: selectedLeague || league, isLoading, error }
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
