import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { useSelectedLeague } from '@/api/leagueQueries';

type LeagueProps = {

}

const LeagueHeader: React.FC<LeagueProps> = ({ }) => {
  const { data: league, isLoading, error } = useSelectedLeague();

  if (isLoading) return (<></>);

  return (
    <View style={styles.leagueContainer}>
      <Text style={styles.leagueText}>{league.name}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  leagueContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  leagueText: {
    fontSize: 32,
    fontWeight: 700,
  }
})

export default LeagueHeader