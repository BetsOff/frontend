import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PlayerIcon from './PlayerIcon';

type LogoProps = {
  logo: Logo;
  diameter: number;
}

const PlayerLogo: React.FC<LogoProps> = ({ logo, diameter }) => {
  const icon = logo.icon
  const backgroundColor = (Colors.logo as { [key: string]: string })[logo.bg_color] || Colors.logo.black

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
        },
      ]}
    >
      {icon && (
        <PlayerIcon icon={icon} size={diameter-8} color={logo.color} />
      )}
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
