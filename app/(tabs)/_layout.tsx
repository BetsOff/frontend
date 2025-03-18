import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import { MatchProvider } from '@/context/useMatchContext';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { useThemeColor } from '@/components/Themed';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: useThemeColor(undefined, 'tint'),
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="standings"
        options={{
          title: 'Standings',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="barschart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scores"
        options={{
          title: 'Scores',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="scoreboard-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="live-match"
        options={{
          title: 'Live Match',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: 'Feedback',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="help-circle" size={24} color={color} />,
        }}
      />
      <Tabs.Screen 
        name="more"
        options={{
          title: 'More',
          headerShown: false,
          tabBarIcon: ({ color }) =><Entypo name="dots-three-horizontal" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
