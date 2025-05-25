import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { CustomButton } from "../../CustomButton";
import { CustomInput } from "../../CustomInput";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Content, ErrorText, SuccessText, Title } from "./styles";
import { Keyboard } from "react-native";
import { useUser } from "../../../hooks/useUser";
import { updateUser } from "../../../services/firestoreService";

/** @typedef {'name'| 'age' | 'height' | 'weight' | 'phone' | null} FieldName */

const StringFieldSchema = z.object({
  fieldValue: z.string().trim()
})

const NumberFieldSchema = z.object({
  fieldValue: z.coerce.number({ message: "Digite apenas número nesse campo.f" })
})

/**
 * 
 * @param {{ 
 *  bottomSheetRef: BottomSheetModal
 *  fieldName: FieldName
 * }} props 
 */
export function UpdateFieldModal({ bottomSheetRef, fieldName }) {
  const { user, setUser } = useUser()
  const snapPoints = useMemo(() => ['80%', '100%'], [])
  const [isLoading, setIsLoading] = useState(false)
  const [successText, setSuccessText] = useState("")
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      fieldValue: '',
    },
    resolver: zodResolver(fieldName === 'name' ? StringFieldSchema : NumberFieldSchema)
  })

  async function handleUpdateField({ fieldValue }) {
    setIsLoading(true)
    setSuccessText('')
    
    try {
      await updateUser({
        ...user,
        [fieldName]: fieldValue
      })
      setUser({
        ...user,
        [fieldName]: fieldValue
      })
      reset()
      setSuccessText("Campo atualizado com sucesso.")
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
        <Title>Atualizar informação</Title>

        <Controller
          name="fieldValue"  
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput 
              label={
                fieldName === 'name' ? 'Nome'
                  : fieldName === 'age' ? 'Idade'
                  : fieldName === 'height' ? 'Altura (cm)'
                  : fieldName === 'weight' ? 'Peso (kg)'
                  : 'Telefone'
              } 
              placeholder="Digite aqui..." 
              value={value}
              onChangeText={onChange}
              keyboardType={
                fieldName === 'name' ? 'default'
                  : fieldName === 'phone' ? 'phone-pad'
                  : 'number-pad'
              }
            />
          )}
        />
        {errors.fieldValue && <ErrorText>{errors.fieldValue.message}</ErrorText>}
        {successText && <SuccessText>{successText}</SuccessText>}

        <CustomButton 
          title="Atualizar campo" 
          style={{ marginTop: 16 }}
          isLoading={isLoading}
          onPress={handleSubmit(handleUpdateField)}
          type="SECONDARY"
        />
      </Content>
    </Container>
  )
}
