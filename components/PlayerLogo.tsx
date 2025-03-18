import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColor } from './Themed';

type LogoProps = {
  color: string;
  diameter: number;
}

const PlayerLogo: React.FC<LogoProps> = ({ color, diameter }) => {
  const colorScheme = useColor();
  const logoColor = (Colors.logo as { [key: string]: string })[color] || Colors.logo.black;

  return (
    <View
      style={[
        styles.logo,
        {
          backgroundColor: logoColor || Colors.logo.black,
          width: diameter,
          height: diameter,
          borderRadius: diameter / 2,
          borderColor: colorScheme.active_text
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default PlayerLogo;
