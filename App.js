import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/styles/theme';
import { Login } from './src/screens/Login';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}
