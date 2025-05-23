import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Container, LoadingText, ProgressBar } from "./styles";

export function SplashScreen() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [logged, setLogged] = useState(false);
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [fadeAnim] = useState(new Animated.Value(1)); 
  const totalSteps = 2;

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

  useEffect(() => {
    if (progress === totalSteps) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        if(logged) 
            navigation.replace("BottomTabsNavigation")
        else 
            navigation.replace("SignIn")
      });
    }
  }, [progress]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <Container>
        <LottieView
          source={require("../../../assets/splash_screen.json")}
          autoPlay
          loop
          style={{ width: 400, height: 400 }}
        />

        <ProgressBar
          style={{ width: `${(progress / totalSteps) * 100}%` }}
        />
        <LoadingText>Carregando...</LoadingText>
      </Container>
    </Animated.View>
  );
}
