import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from '@/components/Themed';

import Match from './Match';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

type MatchesProps = {

}

const MatchList: React.FC<MatchesProps> = ({ }) => {
  const matchSet = useSelector((state: RootState) => state.match.matches);

  if (!matchSet) return (<></>);

  const matches = matchSet.matches;
  const status = matchSet.status;

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