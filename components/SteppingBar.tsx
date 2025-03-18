import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';

type SteppingBarProps = {
  onGoForward: () => void;
  onGoBack: () => void;
}

const SteppingBar: React.FC<SteppingBarProps> = ({ onGoForward, onGoBack }) => {
  return (
    <View style={styles.container}>
      <Button title="Back" onPress={onGoBack} />
      <Button title="Forward" onPress={onGoForward} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default SteppingBar;