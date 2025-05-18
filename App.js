import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/styles/theme';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { ActivityIndicator } from 'react-native';
import { AppNavigation } from './src/navigation/AppNavigation';

export function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      {!fontsLoaded ? <ActivityIndicator /> : <AppNavigation />}
    </ThemeProvider>
  );
}
