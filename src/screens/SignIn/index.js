import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Container, ContentWrapper, EyeClosedIcon, EyeOpenIcon, ForgotPasswordText, Form, SignUpContainer, SignUpText, Text } from "./styles";
import { CustomInput } from "../../components/CustomInput";
import { useState } from "react";
import { CustomButton } from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const navigate = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  function goToSignUpScreen() {
    navigate.replace('SignUp')
  }

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ContentWrapper>
            <Image source={require('../../../assets/logo.png')} />
            <Text>Sua plataforma de fitness</Text>
            
            <Form>
              <CustomInput 
                label="Email" 
                placeholder="usuario@email.com" 
                value={email}
                onChangeText={setEmail}
              />

              <CustomInput 
                label="Senha" 
                placeholder="********" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                icon={showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                onIconPress={() => setShowPassword(!showPassword)}
                iconPos="right"
                separateIcon
              />

              <CustomButton title="Entrar" style={{ marginTop: 16 }} />

              <TouchableOpacity style={{ alignSelf: 'center' }}>
                <ForgotPasswordText>
                  Esqueceu sua senha?
                </ForgotPasswordText>
              </TouchableOpacity>
            </Form>

            <SignUpContainer onPress={goToSignUpScreen}>
              <SignUpText type="regular">Não tem uma conta?</SignUpText>
              <SignUpText type="bold">Cadastre-se</SignUpText>
            </SignUpContainer>
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  )
}
