import apiRoutes from "@/routes/apiRoutes";
import { storageGetItem } from "@/util/Storage";
import axios from "axios";

export const fetchSeason = async (league: League) => {
  if (league.id == 0) return [];

  try {
    const response = await axios.get(apiRoutes.season.get + `?league_id=${league.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Token ${storageGetItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching season:', error)
    return [];
  }
}