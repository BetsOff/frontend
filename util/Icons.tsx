import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ReactNode } from 'react';

export default function getIcon(league: string, color: string, size: number): ReactNode {
  if (league == 'MLB') {
    return (
      <FontAwesome5 name="baseball-ball" size={size} color={color} />
    )
  }
  if (league == 'NFL') {
    return (
      <FontAwesome5 name="football-ball" size={size} color={color} />
    )
  }
  if (league == 'NBA') {
    return (
      <FontAwesome5 name="basketball-ball" size={size} color={color} />
    )
  }
  if (league == 'NHL') {
    return (
      <MaterialIcons name="sports-hockey" size={size} color={color} />
    )
  }
  return (<></>)
}