import { StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

import { Text, View } from '@/components/Themed';
import LeagueHeader from '@/components/LeagueHeader';
import MatchHeader from '@/components/Scores/MatchHeader';
import MatchList from '@/components/Scores/MatchList';
import { useMatchSetContext } from '@/context/useMatchSetContext';

import SteppingBar from '@/components/SteppingBar';
import { storageGetItem } from '@/util/Storage';
import NoDataScreen from '../no_data';
import CreateButton from '@/components/CreateButton';
import apiRoutes from '@/routes/apiRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export default function ScoresScreen() {
  const league = useSelector((state: RootState) => state.league.currentLeague);
  const { matchSet, setMatchSet } = useMatchSetContext();
  const [loading, setLoading] = useState(true);
  const season = useSelector((state: RootState) => state.season.season);

  if (league == null) {
    return (
      <NoDataScreen data='league' />
    )
  } else if (season == null) {
    return (
      <NoDataScreen data='season' />
    )
  }

  const backMatch = () => {
    var next_match = 1;
    var playoff = false;
    if (matchSet.playoff == true) {
      // Playoff
      if (matchSet.match_number == 1) {
        next_match = matchSet.num_regular_season_matches;
      } else {
        next_match = matchSet.match_number - 1;
        playoff = true;
      }
    } else {
      // Regular Season
      if (matchSet.match_number > 1) {
        next_match = matchSet.match_number - 1;
      }
    }
    fetchData(next_match, playoff)
  }

  const forwardMatch = () => {
    var next_match = 1;
    var playoff = false;
    if (matchSet.playoff == true) {
      // Playoff
      playoff = true;
      if (matchSet.match_number < matchSet.num_playoff_matches) {
        next_match = matchSet.match_number + 1;
      } else {
        next_match = matchSet.num_playoff_matches;
      }
    } else {
      // Regular Season
      if (matchSet.match_number == matchSet.num_regular_season_matches && matchSet.num_playoff_matches > 0) {
        next_match = 1
        playoff = true
      } else {
        next_match = matchSet.match_number + 1;
      }
    }
    fetchData(next_match, playoff)
  }

  const fetchData = async (matchNumber: number, playoff: boolean) => {
    try {
      var p = 'False'
      if (playoff) {
        p = 'True'
      }
      const queryParams: string = `?season_id=${season.id}&match_number=${matchNumber}&playoff=${p}`

      const response = await axios.get(apiRoutes.match.get + queryParams, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Token ${storageGetItem('token')}`,
        },
      });

      setMatchSet(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
      return (
        <View>
          <Text>Not Found</Text>
        </View>
      )
    } finally {
      setLoading(false);
    }
  };

  if (season.season_number == 0 || season.season_number == undefined) {
    return (
      <View style={styles.container}>
        <LeagueHeader />
        {league.commissioner
          ? <View style={styles.seasonButtonContainer}>
            <CreateButton object='Season' link='/create_season' />
          </View>
          : <></>
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <LeagueHeader />
      <MatchHeader />
      <SteppingBar onGoForward={forwardMatch} onGoBack={backMatch} />
      <MatchList
        matches={matchSet.matches}
        starting_credits={matchSet.starting_credits}
        status={matchSet.status}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  seasonButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }
});
