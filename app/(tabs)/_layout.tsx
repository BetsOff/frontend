import React from 'react';
import { Tabs } from 'expo-router';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useThemeColor } from '@/components/Themed';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: useThemeColor(undefined, 'tint'),
        tabBarStyle: {
          backgroundColor: useThemeColor(undefined, 'background_2'),
        },
        headerStyle: {
          backgroundColor: useThemeColor(undefined, 'brand'),
        },
        headerTintColor: useThemeColor(undefined, 'active_text'),
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="standings"
        options={{
          title: 'Standings',
          headerTintColor: useThemeColor(undefined, 'white'),
          tabBarIcon: ({ color }) => <AntDesign name="barschart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scores"
        options={{
          title: 'Scores',
          headerTintColor: useThemeColor(undefined, 'white'),
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="scoreboard-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="live-match"
        options={{
          title: 'Live Match',
          headerTintColor: useThemeColor(undefined, 'white'),
          tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTintColor: useThemeColor(undefined, 'white'),
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={28} color={color} />,
        }}
      />
      <Tabs.Screen 
        name="more"
        options={{
          title: 'More',
          headerTintColor: useThemeColor(undefined, 'white'),
          tabBarIcon: ({ color }) =><Entypo name="dots-three-horizontal" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
