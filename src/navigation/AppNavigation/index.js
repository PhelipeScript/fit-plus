import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { PublicNavigation } from "../PublicNavigation";
import { SplashScreen } from "../../screens/SplashScreen";
import { PrivateNavigation } from "../PrivateNavigation";
import { useEffect, useState } from "react";
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

export function AppNavigation() {
  const totalSteps = 2;
  const [progress, setProgress] = useState(0);
  const [logged, setLogged] = useState(false);
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (fontsLoaded) setProgress((p) => p + 1);
  }, [fontsLoaded])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, {
      next: (user) => {
        setLogged(!!user);
        setProgress((p) => p + 1);
      }
    });

    return () => unsub();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        {!loaded ? (
          <SplashScreen progress={progress} totalSteps={totalSteps} loaded={setLoaded} />
        ) : (
          logged ? <PrivateNavigation /> : <PublicNavigation />
        )}
      </NavigationContainer>
    </PaperProvider>
  )
}
