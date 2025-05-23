import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { Container, ContentWrapper, ErrorText, EyeClosedIcon, EyeOpenIcon, Form, SignInContainer, SignInText, Subtitle, Title, TitleContainer } from "./styles";
import { CustomInput } from "../../components/CustomInput";
import { useState } from "react";
import { CustomButton } from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../../services/authService";
import { EmailAlreadyExistsError } from "../../errors/EmailAlreadyExistsError";
import { InvalidEmailError } from "../../errors/InvalidEmailError";
import { WeakPasswordError } from "../../errors/WeakPasswordError";

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
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm({
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

  /**
  * 
  * @param {z.infer<SignUpSchema>} data 
  */
  async function handleSignUp({ email, password }) {
    setIsLoading(true)
    try {
      await signUp(email, password)
      reset()
      navigate.replace("BottomTabsNavigation")
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError || error instanceof InvalidEmailError) {
        setError("email", { type: "manual", message: error.message });
      } else if (error instanceof WeakPasswordError) {
        setError("password", { type: "manual", message: error.message });
      } else {
        console.error(error);
        alert(error.message);
      }
    } finally {
      setIsLoading(false)
    }
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
                onPress={handleSubmit(handleSignUp)}
                style={{ marginTop: 16 }} 
                isLoading={isLoading}
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
