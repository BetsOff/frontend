import apiRoutes from "@/routes/apiRoutes";
import { storageGetItem } from "@/util/Storage";
import axios from "axios";

export const fetchLeagues = async () => {
  const user_id = storageGetItem('user_id');
  if (user_id == undefined) {
    return [];
  }
  try {
    const response = await axios.get(apiRoutes.league.get + `?user_id=${storageGetItem('user_id')}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Token ${storageGetItem('token')}`,
      }
    });

    return response.data;

  } catch (error) {
    console.error('Error fetching league: ', error);
    return [];
  }
}
