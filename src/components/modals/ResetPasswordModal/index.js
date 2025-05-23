import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { CustomButton } from "../../CustomButton";
import { CustomInput } from "../../CustomInput";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordByEmail } from "../../../services/authService";
import { Container, Content, ErrorText, SuccessText, Title } from "./styles";
import { Keyboard } from "react-native";

const ResetPasswordModalSchema = z.object({
  email: z.string().email("Email inválido!"),
})

/**
 * 
 * @param {{ bottomSheetRef: BottomSheetModal }} props 
 */
export function ResetPasswordModal({ bottomSheetRef }) {
  const snapPoints = useMemo(() => ['80%', '100%'], [])
  const [isLoading, setIsLoading] = useState(false)
  const [successText, setSuccessText] = useState("")
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ResetPasswordModalSchema)
  })

  /**
   * 
   * @param {z.infer<ResetPasswordModalSchema>} data 
   */
  async function handleResetPassword({ email }) {
    setIsLoading(true)
    setSuccessText('')
    
    try {
      await resetPasswordByEmail(email)
      reset()
      setSuccessText("Email para redefinição de senha enviado.")
      Keyboard.dismiss()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop 
          {...props} 
          disappearsOnIndex={-1} 
          appearsOnIndex={0} 
          opacity={0.8} 
        />
      )}
    >
      <Content>
        <Title>Redefinir Senha</Title>

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
        {successText && <SuccessText>{successText}</SuccessText>}

        <CustomButton 
          title="Confirmar" 
          style={{ marginTop: 16 }}
          isLoading={isLoading}
          onPress={handleSubmit(handleResetPassword)}
          type="SECONDARY"
        />
      </Content>
    </Container>
  )
}
