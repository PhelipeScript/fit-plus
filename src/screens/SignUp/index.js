import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { Container, ContentWrapper, ErrorText, EyeClosedIcon, EyeOpenIcon, Form, SignInContainer, SignInText, Subtitle, Title, TitleContainer } from "./styles";
import { CustomInput } from "../../components/CustomInput";
import { useState } from "react";
import { CustomButton } from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpSchema = z.object({
  name: z.string().trim().nonempty("O nome não pode estar vazio!"),
  email: z.string().email("Email inválido!"),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres!"),
  confirmPassword: z.string().min(6, "A senha deve conter pelo menos 6 caracteres!"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas não coincidem!',
})

export function SignUp() {
  const navigate = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(SignUpSchema)
  })

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
              <Controller 
                name="name"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput 
                    label="Seu nome completo" 
                    placeholder="Digite o seu nome..." 
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

              <Controller 
                name="email"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput 
                    label="Seu melhor email" 
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
                    label="Crie uma senha" 
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

              <Controller 
                name="confirmPassword"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput 
                    label="Confirme sua senha" 
                    placeholder="********" 
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showConfirmPassword}
                    icon={showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    iconPos="right"
                    separateIcon
                  />
                )}
              />
              {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}

              <CustomButton 
                title="Cadastrar" 
                onPress={handleSubmit()}
                style={{ marginTop: 16 }} 
              />
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
