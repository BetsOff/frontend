import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { useSelectedLeague } from '@/api/leagueQueries';
import HeaderLoading from './HeaderLoading';

type LeagueProps = {
  leagueName: string;
  isLoading?: boolean;
}

const LeagueHeader: React.FC<LeagueProps> = ({ 
  leagueName,
  isLoading = false,
}) => {

  if (isLoading) return (
    <View style={{
      flexDirection: 'row',
      width: '300%',
      marginBottom: -13,
    }}>
      <HeaderLoading withDates={false} />
    </View>
  );

  return (
    <View style={styles.leagueContainer}>
      <Text style={styles.leagueText}>{leagueName}</Text>
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