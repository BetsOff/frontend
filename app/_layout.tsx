import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { MatchProvider } from '@/context/useMatchContext';
import { MatchSetProvider } from '@/context/useMatchSetContext';
import { SelectedLineProvider } from '@/context/useSelectedLineContext';
import { SelectedLeagueProvider } from '@/context/useSelectedLeagueContext';
import { PlayerOneBetListProvider } from '@/context/usePlayerOneBetListContext';
import { PlayerTwoBetListProvider } from '@/context/usePlayerTwoBetListContext';
import { storageGetItem } from '@/util/Storage';
import { AuthProvider } from '@/context/useAuthContext';
import { SeasonProvider } from '@/context/useSeasonContext';
import { LeagueProvider } from '@/context/useLeagueContext';
import { LeagueSetProvider } from '@/context/useLeagueSetContext';

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
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <LeagueSetProvider>
          <LeagueProvider>
            <SeasonProvider>
              <MatchSetProvider>
                <MatchProvider>
                  <SelectedLeagueProvider>
                    <SelectedLineProvider>
                      <PlayerOneBetListProvider>
                        <PlayerTwoBetListProvider>
                            <Stack>

                              <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
                              <Stack.Screen name="create_account" options={{ headerShown: false, }}/>
                              <Stack.Screen name="(tabs)" options={{ title: '', headerShown: false }} />
                              <Stack.Screen name="make_bet" options={{ title: 'Make Bet', headerShown: false, presentation: 'modal' }} />

                            </Stack>
                        </PlayerTwoBetListProvider>
                      </PlayerOneBetListProvider>
                    </SelectedLineProvider>
                  </SelectedLeagueProvider>
                </MatchProvider>
              </MatchSetProvider>
            </SeasonProvider>
          </LeagueProvider>
        </LeagueSetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
