import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { Container, ContentWrapper, EyeClosedIcon, EyeOpenIcon, Form, SignInContainer, SignInText, Subtitle, Title, TitleContainer } from "./styles";
import { CustomInput } from "../../components/CustomInput";
import { useState } from "react";
import { CustomButton } from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const navigate = useNavigation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function goToSignInScreen() {
    navigate.replace('SignIn')
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
            <TitleContainer>
              <Title>Criar Conta</Title>
              <Subtitle>Preencha os campos abaixo para começar</Subtitle>
            </TitleContainer>
            
            <Form>
              <CustomInput 
                label="Seu nome completo" 
                placeholder="Digite o seu nome..." 
                value={name}
                onChangeText={setName}
              />

              <CustomInput 
                label="Seu melhor email" 
                placeholder="usuario@email.com" 
                value={email}
                onChangeText={setEmail}
              />

              <CustomInput 
                label="Crie uma senha" 
                placeholder="********" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                icon={showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                onIconPress={() => setShowPassword(!showPassword)}
                iconPos="right"
                separateIcon
              />

              <CustomInput 
                label="Confirme sua senha" 
                placeholder="********" 
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                icon={showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                iconPos="right"
                separateIcon
              />

              <CustomButton title="Cadastrar" style={{ marginTop: 16 }} />
            </Form>

            <SignInContainer onPress={goToSignInScreen}>
              <SignInText type="regular">Já tem uma conta?</SignInText>
              <SignInText type="bold">Entre aqui</SignInText>
            </SignInContainer>
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  )
}
