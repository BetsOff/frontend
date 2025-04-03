import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useColor, View } from '@/components/Themed';
import { Href, useRouter } from 'expo-router';

import PlayerScore from './PlayerScore';
import { useDispatch, useSelector } from 'react-redux';
import { useMatches } from '@/api/matchQueries';
import { setMatch } from '@/state/MatchSlice';

type MatchProps = {
  match: Match;
  status: string;
}

const Match: React.FC<MatchProps> = ({ match, status }) => {
  const color = useColor();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: matches } = useMatches();

  if (!matches) return (<></>);

  const handleMatchPressed = () => {
    dispatch(setMatch(match.match_id));
    router.replace('/live-match' as Href);
  }

  return (
    <TouchableOpacity onPress={handleMatchPressed}>
      <View style={[styles.matchContainer, { backgroundColor: color.background_2 }]}>
        <PlayerScore
          participant={match.participants[0]}
          winner={match.winner}
          starting_credits={matches.starting_credits}
          status={status}
        />
        <PlayerScore
          participant={match.participants[1]}
          winner={match.winner}
          starting_credits={matches.starting_credits}
          status={status}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  matchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 5,
    borderRadius: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 5,
  },
})


export default Match