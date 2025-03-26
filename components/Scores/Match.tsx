import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColor, View } from '@/components/Themed';
import { Href, useRouter } from 'expo-router';

import PlayerScore from './PlayerScore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setCurrentMatch } from '@/state/MatchSlice';
import { resetBets } from '@/state/BetSlice';

type MatchProps = {
  match: Match;
  status: string;
}

const Match: React.FC<MatchProps> = ({ match, status }) => {
  const color = useColor();
  const router = useRouter();
  const dispatch = useDispatch();
	const matches =  useSelector((state: RootState) => state.match.matches);

  if (!matches) return (<></>);

  const handleMatchPressed = () => {
    dispatch(resetBets());
    dispatch(setCurrentMatch(match));
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