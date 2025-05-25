import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { Container, ContentWrapper, ErrorText, Form } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from '../../components/CustomInput/index';
import { Barbell } from "phosphor-react-native";
import { CustomButton } from '../../components/CustomButton/index';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useTheme } from "styled-components";
import { SelectInput } from '../../components/SelectInput/index';
import { createNewWorkout } from "../../services/firestoreService";

const NewWorkoutSchema = z.object({
  name: z.string().trim().nonempty("Esse campo não pode estar vazio"),
  description: z.string().trim().nonempty("Esse campo não pode estar vazio"),
  frequency: z.string().trim().nonempty("Esse campo não pode estar vazio"),
  kcal: z.string().trim().nonempty("Esse campo não pode estar vazio"),
  level: z.string().trim().nonempty("Esse campo não pode estar vazio"),
})

export function NewWorkout() {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      frequency: '1x por semana',
      kcal: '0',
      level: 'Iniciante',
    },
    resolver: zodResolver(NewWorkoutSchema)
  })

  /**
 * 
 * @param {z.infer<NewWorkoutSchema>} newWorkout 
 */
  async function handleCreateNewWorkout(newWorkout) {
    setIsLoading(true)
    try {
      await createNewWorkout({ ...newWorkout, totalExercises: 0 })
      reset()
    } catch (error) {
      console.error(error)
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
            <Form>
              <Controller
                name="name"  
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    label="Nome do treino"
                    icon={<Barbell size={24} weight="fill" color={theme.colors.primary} />}
                    placeholder="Nome do treino" 
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            
              <Controller 
                name="description"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput 
                    label="Descrição"
                    placeholder="Descrição do treino" 
                    value={value}
                    onChangeText={onChange}
                    multiline
                  />
                )}
              />
              {errors.description && <ErrorText>{errors.description.message}</ErrorText>}

              <Controller 
                name="frequency"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    label="Frequência"
                    value={value}
                    onChange={onChange}
                    options={[
                      'Diariamente',
                      '3x por semana',
                      '2x por semana',
                      '1x por semana',
                    ]}
                  />
                )}
              />
              {errors.frequency && <ErrorText>{errors.frequency.message}</ErrorText>}

              <Controller 
                name="kcal"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput 
                    label="Estimativa de calorias queimadas (kcal)"
                    placeholder="Descrição do treino" 
                    value={value}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                  />
                )}
              />
              {errors.kcal && <ErrorText>{errors.kcal.message}</ErrorText>}

              <Controller 
                name="level"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    label="Frequência"
                    value={value}
                    onChange={onChange}
                    options={[
                      'Iniciante',
                      'Intermediário',
                      'Avançado',
                    ]}
                  />
                )}
              />
              {errors.level && <ErrorText>{errors.level.message}</ErrorText>}

              <CustomButton
                title="Criar Treino" 
                onPress={handleSubmit(handleCreateNewWorkout)} 
                style={{ marginTop: 16 }}
                isLoading={isLoading}
              />
            </Form>
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  )
}
