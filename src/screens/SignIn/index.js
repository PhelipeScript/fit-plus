import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Container, ContentWrapper, ErrorText, EyeClosedIcon, EyeOpenIcon, ForgotPasswordText, Form, SignUpContainer, SignUpText, Text } from "./styles";
import { CustomInput } from "../../components/CustomInput";
import { useState } from "react";
import { CustomButton } from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInSchema = z.object({
  email: z.string().email("Email inválido!"),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres!")
})

export function SignIn() {
  const navigate = useNavigation()
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SignInSchema)
  })

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
              <Controller 
                name="email"  
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput 
                    label="Email" 
                    placeholder="usuario@email.com" 
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            
              <Controller 
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput 
                    label="Senha" 
                    placeholder="********" 
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    icon={showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    onIconPress={() => setShowPassword(!showPassword)}
                    iconPos="right"
                    separateIcon
                  />
                )}
              />
              {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

              <CustomButton 
                title="Entrar" 
                onPress={handleSubmit()} 
                style={{ marginTop: 16 }}
              />

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
