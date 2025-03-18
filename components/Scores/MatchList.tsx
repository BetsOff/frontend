import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from '@/components/Themed';

import Match from './Match';

type MatchesProps = {
  matches: Match[];
  status: string;
  starting_credits: number;
}

const MatchList: React.FC<MatchesProps> = ({ matches, status, starting_credits }) => {
  return (
    <View style={styles.matchListContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {matches.map((match, index) => (
          <Match
            match={match}
            key={index}
            status={status}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  matchListContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '75%',
  },
})

export default MatchList