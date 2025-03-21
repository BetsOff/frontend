import { StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

import { Text, View } from '@/components/Themed';
import LeagueHeader from '@/components/LeagueHeader';
import MatchHeader from '@/components/Scores/MatchHeader';
import MatchList from '@/components/Scores/MatchList';

import SteppingBar from '@/components/SteppingBar';
import { storageGetItem } from '@/util/Storage';
import NoDataScreen from '../no_data';
import CreateButton from '@/components/CreateButton';
import apiRoutes from '@/routes/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setMatches } from '@/state/MatchSlice';

export default function ScoresScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const league = useSelector((state: RootState) => state.league.currentLeague);
  const season = useSelector((state: RootState) => state.season.season);
  const matches = useSelector((state: RootState) => state.match.matches);

  if (!league) {
    return (
      <NoDataScreen data='league' />
    )
  } else if (!season) {
    return (
      <NoDataScreen data='season' />
    )
  } else if (!matches) {
    return (
      <></>
    )
  }

  const backMatch = () => {
    var next_match = 1;
    var playoff = false;
    if (matches.playoff == true) {
      // Playoff
      if (matches.match_number == 1) {
        next_match = matches.num_regular_season_matches;
      } else {
        next_match = matches.match_number - 1;
        playoff = true;
      }
    } else {
      // Regular Season
      if (matches.match_number > 1) {
        next_match = matches.match_number - 1;
      }
    }
    fetchData(next_match, playoff)
  }

  const forwardMatch = () => {
    var next_match = 1;
    var playoff = false;
    if (matches.playoff == true) {
      // Playoff
      playoff = true;
      if (matches.match_number < matches.num_playoff_matches) {
        next_match = matches.match_number + 1;
      } else {
        next_match = matches.num_playoff_matches;
      }
    } else {
      // Regular Season
      if (matches.match_number == matches.num_regular_season_matches && matches.num_playoff_matches > 0) {
        next_match = 1
        playoff = true
      } else {
        next_match = matches.match_number + 1;
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

      dispatch(setMatches(response.data));

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
        matches={matches.matches}
        starting_credits={matches.starting_credits}
        status={matches.status}
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
