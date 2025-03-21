import apiRoutes from "@/routes/apiRoutes";
import { storageGetItem } from "@/util/Storage";
import axios from "axios";

export const fetchMatchSet = async (season: Season) => {
  if (!season.id || season.id === 0) return null;

  try {
    const response = await axios.get(apiRoutes.match.get + `?season_id=${season.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Token ${storageGetItem('token')}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching default match set:', error);
    return null;
  }
};
