import LottieView from "lottie-react-native";
import { Container } from "./styles";

/**
 *  
 * @param {{ width: number, height: number }} props 
 * @returns 
 */
export function Loading({ width=100, height=100 }) {
  return (
    <Container>
      <LottieView
        source={require("../../../assets/loading.json")}
        autoPlay
        loop
        style={{ width, height }}
      />
    </Container>
  );
}
