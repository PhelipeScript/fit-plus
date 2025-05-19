import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { Container, ContentWrapper, EyeClosedIcon, EyeOpenIcon, Form, Subtitle } from "./styles";
import { CustomInput } from "../../components/CustomInput";
import { useState } from "react";

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ContentWrapper>
            <Image source={require('../../../assets/logo.png')} />
            <Subtitle>Sua plataforma de fitness</Subtitle>
            
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
            </Form>
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  )
}
