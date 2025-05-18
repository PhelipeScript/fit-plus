import { Image } from "react-native";
import { Container, Title } from "./styles";

export function SignIn() {
  return (
    <Container>
      <Image source={require('../../../assets/logo.png')} />
      <Title>Tela de login</Title>
    </Container>
  )
}
