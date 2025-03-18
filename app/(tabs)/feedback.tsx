import { Alert, Linking, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, useColor, View } from '@/components/Themed';

export default function HelpScreen() {
  const color = useColor();
  const handleLink = async () => {
    const formLink = 'https://discord.gg/bWvXWeSV'

    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(formLink);

    if (supported) {
      // Open the URL in the default web browser
      await Linking.openURL(formLink);
    } else {
      Alert.alert(`Don't know how to open this URL: ${formLink}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Follow the instrcutions submit bug reports, feature requests, or general feedback</Text>
        <Text style={styles.instructions}>1. Open Testflight</Text>
        <Text style={styles.instructions}>2. Click on BetsOff: Fantasy League</Text>
        <Text style={styles.instructions}>3. Click on Send Beta Feedback</Text>
        <Text style={styles.instructions}>(Include screenshot if applicable)</Text>
      </View>
      <TouchableOpacity onPress={handleLink}>
        <View style={[styles.buttonContainer, { backgroundColor: color.brand }]}>
          <Text style={styles.buttonText}>Join our Discord</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitleContainer: {
    margin: 10,
    marginBottom: 25,
    width: '90%',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'left',
    width: '100%',
    margin: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
