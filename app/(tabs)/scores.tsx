import { StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import api from '../../api_url.json'

import { Text, View } from '@/components/Themed';
import LeagueHeader from '@/components/LeagueHeader';
import MatchHeader from '@/components/Scores/MatchHeader';
import MatchList from '@/components/Scores/MatchList';
import { useMatchSetContext } from '@/context/useMatchSetContext';

import SteppingBar from '@/components/SteppingBar';
import { storageGetItem } from '@/util/Storage';
import { emptySeason, useSeasonContext } from '@/context/useSeasonContext';
import { emptyLeague, useLeagueContext } from '@/context/useLeagueContext';
import NoDataScreen from '../no_data';
import CreateButton from '@/components/CreateButton';

export default function ScoresScreen() {
  const { league } = useLeagueContext();
  const { matchSet, setMatchSet } = useMatchSetContext();
  const [loading, setLoading] = useState(true);
  const { season } = useSeasonContext();

  if (league == emptyLeague) {
    return (
      <NoDataScreen data='league' />
    )
  } else if (season == emptySeason) {
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
      // Construct the URL based on the matchNumber
      const baseUrl: string = `${api['url']}/matches/get/?season_id=${season.id}`;
      const fullUrl: string = matchNumber === 0 ? baseUrl : `${baseUrl}&match_number=${matchNumber}&playoff=${p}`;

      // Fetch the data
      const response = await axios.get(fullUrl, {
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
    paddingVertical: 50,
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
