import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColor } from '../Themed';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PlayerIcon from './PlayerIcon';

type LogoProps = {
  logo: Logo;
  diameter: number;
}

const PlayerLogo: React.FC<LogoProps> = ({ logo, diameter }) => {
  // const backgroundColor = (Colors.logo as { [key: string]: string })[bgColor] || Colors.logo.black;
  // const primaryColor = (Colors.logo as { [key: string]: string })[color] || Colors.logo.black;
  const icon = logo.icon
  const backgroundColor = (Colors.logo as { [key: string]: string })[logo.bg_color]
  const primaryColor = (Colors.logo as { [key: string]: string })[logo.color]

  return (
    <View
      style={[
        styles.logo,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor,
          width: diameter,
          height: diameter,
          borderRadius: diameter / 2,
          borderColor: backgroundColor,
          // borderColor: colorScheme.active_text
        },
      ]}
    >
      <PlayerIcon icon={icon} size={diameter-8} color={primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default PlayerLogo;
