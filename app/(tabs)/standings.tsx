import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';

import LeagueHeader from '@/components/LeagueHeader';
import SeasonHeader from '@/components/SeasonHeader';
import StandingsTable from '@/components/Standings/StandingsTable';
import { useSeasonContext } from '@/context/useSeasonContext';
import { useLeagueContext } from '@/context/useLeagueContext';
import NoDataScreen from '../no_data';
import CreateButton from '@/components/CreateButton';

export default function StandingsScreen() {
  const { season, setSeason } = useSeasonContext();
  const { league, setLeague } = useLeagueContext();

  if (league.id == 0) {
    return (
      <NoDataScreen data='league' />
    )
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
    paddingVertical: 50,
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
