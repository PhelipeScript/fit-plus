import { useEffect, useState } from "react";
import { Animated } from "react-native";
import LottieView from "lottie-react-native";
import { Container, LoadingText, ProgressBar } from "./styles";

/**
 *  
 * @param {{
 *  progress: number,
 *  totalSteps: number
 *  loaded: () => void,
 * }} props 
 * @returns 
 */
export function SplashScreen({ progress, totalSteps, loaded }) {
  const [fadeAnim] = useState(new Animated.Value(1)); 

  useEffect(() => {
    if (progress === totalSteps) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(loaded);
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
