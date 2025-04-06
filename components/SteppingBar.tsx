import React from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, useColor } from '@/components/Themed';

type SteppingBarProps = {
  onGoForward: () => void;
  onGoBack: () => void;
  forwardDisabled: boolean;
  backDisabled: boolean;
}

const SteppingBar: React.FC<SteppingBarProps> = ({ 
  onGoForward, 
  onGoBack,
  forwardDisabled = false,
  backDisabled = false,
 }) => {
  const color = useColor();

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    }}>
      <TouchableOpacity 
        style={[{
          width: '45%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.brand,
          paddingVertical: 10,
          borderRadius: 10,
          marginHorizontal: 10,
        },
        backDisabled && {
          backgroundColor: color.background_3,
        }]}
        onPress={onGoBack}
        disabled={backDisabled}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Back
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[{
          width: '45%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.brand,
          paddingVertical: 10,
          borderRadius: 10,
          marginHorizontal: 10,
        },
        forwardDisabled && {
          backgroundColor: color.background_3,
        }]}
        onPress={onGoForward}
        disabled={forwardDisabled}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Forward
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default SteppingBar;