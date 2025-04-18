import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { useThemeColor } from '@/components/Themed';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
};

const scheduleDailyNotification = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Odds are in!",
      body: 'Make your bets now',
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
      type: 'calendar',
    } as Notifications.CalendarTriggerInput,
  });
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  useEffect(() => {
    registerForPushNotificationsAsync();
    scheduleDailyNotification();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="login" options={{
              title: 'Login',
              headerShown: false,
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="create_account" options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="create_league" options={{
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="(tabs)" options={{
              title: '',
              headerShown: false,
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="make_bet" options={{
              title: 'Make Bet',
              headerShown: false,
              presentation: 'modal',
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="other_profile" options={{
              title: 'Profile',
              headerShown: false,
              presentation: 'modal',
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="season_selector" options={{
              title: 'Select Season',
              presentation: 'modal',
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="league_selector" options={{
              title: 'Select League',
              presentation: 'modal',
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="create_season" options={{
              title: 'Create Season',
              presentation: 'modal',
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="edit_logo" options={{
              title: 'Update Logo',
              presentation: 'modal',
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="leagues" options={{
              title: 'My Leagues',
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="league" options={{
              title: 'League',
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
            <Stack.Screen name="invites" options={{
              title: 'Invites',
              headerStyle: {
                backgroundColor: useThemeColor(undefined, 'brand'),
              },
              headerTintColor: useThemeColor(undefined, 'white'),
            }} />
          </Stack>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
