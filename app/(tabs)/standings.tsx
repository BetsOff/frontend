import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';

import LeagueHeader from '@/components/LeagueHeader';
import SeasonHeader from '@/components/SeasonHeader';
import StandingsTable from '@/components/Standings/StandingsTable';
import NoDataScreen from '../no_data';
import CreateButton from '@/components/CreateButton';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { storageGetItem } from '@/util/Storage';
import axios from 'axios';
import apiRoutes from '@/routes/apiRoutes';
import { setLeagues } from '@/state/LeagueSlice';
import { setSeason } from '@/state/SeasonSlice';
import { setMatches } from '@/state/MatchSlice';

export default function StandingsScreen() {
  const dispatch = useDispatch();
  const league = useSelector((state: RootState) => state.league.currentLeague);
  const season = useSelector((state: RootState) => state.season.season);

  useEffect(() => {
    const userId = storageGetItem('user_id');
    const token = storageGetItem('token');
    if (!userId || !token) return;
  
    const fetchLeagues = async () => {
      console.log('fetching leagues')
      if (!userId) return;
      await axios.get(apiRoutes.league.get + `?user_id=${userId}`, {
        headers: {
          'X-Authorization': `Token ${token}`,
        },
      })
      .then(response => {
        dispatch(setLeagues(response.data));
        const firstLeague = response.data.length > 0 
          ? response.data[0] 
          : null;
        if (!firstLeague) return;
        fetchSeason(firstLeague.id);
      })
      .catch(error => {
        console.error('Error fetching league:', error);
        return;
      });
    }

    const fetchSeason = async (leagueId: number) => {
      console.log('fetching season: league:', leagueId);
      axios.get(apiRoutes.season.get + `?league_id=${leagueId}`, {
        headers: {
          'X-Authorization': `Token ${token}`,
        },
      })
      .then(response => {
        dispatch(setSeason(response.data));
        const seasonId = response.data.id;
        if (!seasonId) return;
        fetchMatches(seasonId);
      })
      .catch(error => {
        console.error('Error fetching season:', error);
        return;
      });
    }
    
    const fetchMatches = async (seasonId: number) => {
      console.log('fetching matches: season:', seasonId);
      axios.get(apiRoutes.match.get + `?season_id=${seasonId}`, {
        headers: {
          'X-Authorization': `Token ${token}`,
        },
      })
      .then(response => {
        dispatch(setMatches(response.data));
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
        return;
      })
    }

    fetchLeagues();
  }, []);

  if (!league) {
    return (
      <NoDataScreen data='league' />
    );
  } else if (!season) {
    return (
      <NoDataScreen data='season' />
    );
  }

  return (
    <View style={styles.container}>
      <LeagueHeader />
      {season.season_number == 0 || season.season_number == undefined
        ? league.commissioner
          ? <View style={styles.seasonButtonContainer}>
            <CreateButton object='Season' link='/create_season' />
          </View>
          : <></>
        : <View>
          <SeasonHeader
            name={`Season ${season.season_number}`}
            start_date={season.start_date}
            end_date={season.end_date}
          />
          <StandingsTable />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  seasonButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }
});
