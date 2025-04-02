import { StyleSheet, TouchableOpacity } from 'react-native';

import { View } from '@/components/Themed';

import LeagueHeader from '@/components/LeagueHeader';
import SeasonHeader from '@/components/SeasonHeader';
import StandingsTable from '@/components/Standings/StandingsTable';
import NoDataScreen from '../no_data';
import CreateButton from '@/components/CreateButton';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { storageGetItem } from '@/util/Storage';
import axios from 'axios';
import apiRoutes from '@/routes/apiRoutes';
import { setSeason } from '@/state/SeasonSlice';
import { setMatches } from '@/state/MatchSlice';
import { useRouter } from 'expo-router';
import { useSelectedLeague } from '@/api/leagueQueries';

export default function StandingsScreen() {
  const dispatch = useDispatch();
  const { data: league, isLoading, error } = useSelectedLeague();
  const season = useSelector((state: RootState) => state.season.season);
  const router = useRouter();

  useEffect(() => {
    const userId = storageGetItem('user_id');
    const token = storageGetItem('token');
    if (!userId || !token) return;
  
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

    if (league) fetchSeason(league.id);
  }, [league]);

  if (isLoading || error) return (<></>)

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
          <TouchableOpacity onPress={() => router.push('/season_selector')}>
            <SeasonHeader
              name={`Season ${season.season_number}`}
              start_date={season.start_date}
              end_date={season.end_date}
            />
          </TouchableOpacity>
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
