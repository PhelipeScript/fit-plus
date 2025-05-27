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
import { updateWorkout } from "../../services/firestoreService";
import { useNavigation } from "@react-navigation/native";
import { useWorkouts } from "../../hooks/useWorkouts";

const EditWorkoutSchema = z.object({
  name: z.string().trim().nonempty("Esse campo não pode estar vazio"),
  description: z.string().trim().nonempty("Esse campo não pode estar vazio"),
  frequency: z.string().trim().nonempty("Esse campo não pode estar vazio"),
  kcal: z.string().trim().nonempty("Esse campo não pode estar vazio"),
  level: z.string().trim().nonempty("Esse campo não pode estar vazio"),
})

export function EditWorkout() {
  const theme = useTheme()
  const { currentWorkout } = useWorkouts()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: currentWorkout.name,
      description: currentWorkout.description,
      frequency: currentWorkout.frequency,
      kcal: currentWorkout.kcal,
      level: currentWorkout.level,
    },
    resolver: zodResolver(EditWorkoutSchema)
  })

  /**
 * 
 * @param {z.infer<EditWorkoutSchema>} editWorkout 
 */
  async function handleCreateEditWorkout(editWorkout) {
    setIsLoading(true)
    try {
      await updateWorkout(currentWorkout.id, {
        ...editWorkout,
        id: currentWorkout.id,
        createdAt: currentWorkout.createdAt,
        totalExercises: currentWorkout.totalExercises,
        updatedAt: currentWorkout.updatedAt,
      })
      reset()
      navigation.goBack() 
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
                title="Salvar" 
                onPress={handleSubmit(handleCreateEditWorkout)} 
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
