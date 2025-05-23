import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Container, ContentWrapper, ErrorText, EyeClosedIcon, EyeOpenIcon, ForgotPasswordText, Form, SignUpContainer, SignUpText, Text } from "./styles";
import { CustomInput } from "../../components/CustomInput";
import { useRef, useState } from "react";
import { CustomButton } from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../../services/authService";
import { InvalidCredentialError } from "../../errors/InvalidCredentialError";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import { ResetPasswordModal } from "../../components/modals/ResetPasswordModal";

const SignInSchema = z.object({
  email: z.string().email("Email inválido!"),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres!")
})

export function SignIn() {
  const navigate = useNavigation()
  const bottomSheetRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SignInSchema)
  })

  const openModal = () => bottomSheetRef.current?.present()

  function goToSignUpScreen() {
    navigate.replace('SignUp')
  }

  /**
  * 
  * @param {z.infer<SignInSchema>} data 
  */
  async function handleSignIn({ email, password }) {
    setIsLoading(true)
    try {
      await signIn(email, password)
      reset()
      // navegar para BottomTabsNavigation
    } catch (error) {
      if (error instanceof InvalidCredentialError) {
        setError("password", { type: "manual", message: error.message });
      } else if (error instanceof UserNotFoundError) {
        setError("email", { type: "manual", message: error.message });
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
                onPress={handleSubmit(handleSignIn)} 
                style={{ marginTop: 16 }}
                isLoading={isLoading}
              />

              <TouchableOpacity style={{ alignSelf: 'center' }} onPress={openModal}>
                <ForgotPasswordText>
                  Esqueceu sua senha?
                </ForgotPasswordText>
              </TouchableOpacity>
            </Form>

            <SignUpContainer onPress={goToSignUpScreen}>
              <SignUpText type="regular">Não tem uma conta?</SignUpText>
              <SignUpText type="bold">Cadastre-se</SignUpText>
            </SignUpContainer>

            <ResetPasswordModal bottomSheetRef={bottomSheetRef} />

          </ContentWrapper>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  )
}
