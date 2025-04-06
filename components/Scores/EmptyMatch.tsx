import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';
import { Href, useRouter } from 'expo-router';

import PlayerScore from './PlayerScore';
import { useDispatch, useSelector } from 'react-redux';
import { useMatches } from '@/api/matchQueries';
import { setMatch } from '@/state/MatchSlice';

type EmptyMatchProps = {
  
}

const EmptyMatch: React.FC<EmptyMatchProps> = ({ }) => {
  const color = useColor();
  const { data: matches } = useMatches();

  return (
    <View style={{ 
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 10,
        height: 100,
        backgroundColor: color.background_2, 
        width: '95%',
        flex: 1,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // Shadow for Android
        elevation: 5,
      }}>
      <View style={{
        width: '95%',
        backgroundColor: color.background_3,
        borderRadius: 5,
        height: 28,
        marginTop: 5,
        marginBottom: 10,
      }} />
      <View style={{
        width: '95%',
        backgroundColor: color.background_3,
        borderRadius: 5,
        height: 28,
        marginTop: 5,
      }} />
    </View>
  )
}

export default EmptyMatch;
