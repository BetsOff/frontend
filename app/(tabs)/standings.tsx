import { StyleSheet, TouchableOpacity } from 'react-native';

import { View } from '@/components/Themed';

import LeagueHeader from '@/components/LeagueHeader';
import SeasonHeader from '@/components/SeasonHeader';
import StandingsTable from '@/components/Standings/StandingsTable';
import NoDataScreen from '../no_data';
import CreateButton from '@/components/CreateButton';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { useSelectedLeague } from '@/api/leagueQueries';
import { useSelectedSeason } from '@/api/seasonQueries';

export default function StandingsScreen() {
  const { 
    data: league, 
    isLoading: leagueIsLoading,
    error: leagueError,
  } = useSelectedLeague();

  const {
    data: season,
    isLoading: seasonIsLoading,
    error: seasonError,
  } = useSelectedSeason();

  const router = useRouter();  

  if (leagueIsLoading || leagueError) return (<></>);
  if (seasonIsLoading || seasonError) return (<></>);

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
