import { storageGetItem } from "@/util/Storage"
import { useQueryClient } from "react-query"

export const authQueryKey = `auth${storageGetItem('user_id')}`

export const useInvalidateAuth = () => {
  const queryClient = useQueryClient();

  return async () => {
    queryClient.clear();
    await queryClient.invalidateQueries()
  }
}