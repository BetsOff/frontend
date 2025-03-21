import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import PlayerVsPlayerHeader from '@/components/Match/PlayerVsPlayerHeader';
import MatchHeader from '@/components/Scores/MatchHeader';
import BetList from '@/components/Match/BetList';
import NoDataScreen from '../no_data';
import LeagueHeader from '@/components/LeagueHeader';
import CreateButton from '@/components/CreateButton';
import { emptyMatch, useMatchContext } from '@/context/useMatchContext';
import { storageGetItem } from '@/util/Storage';
import todayInTimeFrame from '@/util/inTimeFrame';
import MakeBetButton from '@/components/Match/MakeBetButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export default function LiveMatchScreen() {
  const { match } = useMatchContext();
  const league = useSelector((state: RootState) => state.league.currentLeague);
  const season = useSelector((state: RootState) => state.season.season);

  if (league == null) {
    return (
      <NoDataScreen data='league'/>
    )
  } else if (season == null) {
    return (
      <NoDataScreen data='season' />
    )
  } else if (match == emptyMatch) {
    return (<></>)
  }

  if (season.season_number == 0 || season.season_number == undefined) {
    return (
      <View style={[styles.container, {alignItems: 'flex-start'}]}>
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

  if (match.participants.length == 0) {
    return (
      <View style={[styles.container, {alignItems: 'flex-start'}]}>
        <LeagueHeader />
        <MatchHeader />
      </View>
    )
  }
  
  var loadMakeBets = false;
  if (match.participants[0].user_id == Number(storageGetItem('user_id')) && todayInTimeFrame(match.start_date, match.end_date) && match.participants[0].credits_remaining > 0) {
      loadMakeBets = true;
  }

  return (
    <View style={styles.container}>
      <MatchHeader />
      <PlayerVsPlayerHeader />
      <BetList />
      {loadMakeBets && (
        <View style={styles.makeBetContainer}>
          <MakeBetButton />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  matchNumber: {
    fontSize: 24,
    paddingTop: 10,
  },
  seasonButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  makeBetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '93%',
    borderRadius: 100,
  },
});
