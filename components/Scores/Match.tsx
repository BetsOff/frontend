import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColor, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { useMatchContext } from '../../context/useMatchContext';

import PlayerScore from './PlayerScore';
import { useMatchSetContext } from '../../context/useMatchSetContext';

type MatchProps = {
  match: Match;
  status: string;
}

const Match: React.FC<MatchProps> = ({ match, status }) => {
  const color = useColor();
  const router = useRouter();
  const { setMatch } = useMatchContext();
  const { matchSet } = useMatchSetContext();

  const handleMatchPressed = () => {
    setMatch(match)
    router.replace('/live_match');
  }

  return (
    <TouchableOpacity onPress={handleMatchPressed}>
      <View style={[styles.matchContainer, { backgroundColor: color.background_2 }]}>
        <PlayerScore
          participant={match.participants[0]}
          winner={match.winner}
          starting_credits={matchSet.starting_credits}
          status={status}
        />
        <PlayerScore
          participant={match.participants[1]}
          winner={match.winner}
          starting_credits={matchSet.starting_credits}
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