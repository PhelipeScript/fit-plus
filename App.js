import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/styles/theme';
import { Login } from './src/screens/Login';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { ActivityIndicator } from 'react-native';

export function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      {!fontsLoaded ? <ActivityIndicator /> : <Login />}
    </ThemeProvider>
  );
}
