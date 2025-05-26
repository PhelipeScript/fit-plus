import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { Container, ContentWrapper, ControllerWrapper, ErrorText, Form } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from '../../components/CustomInput/index';
import { Barbell } from "phosphor-react-native";
import { CustomButton } from '../../components/CustomButton/index';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useTheme } from "styled-components";
import { SelectInput } from '../../components/SelectInput/index';
import { useNavigation } from "@react-navigation/native";
import { createNewExercise } from "../../services/firestoreService";
import { useWorkouts } from './../../hooks/useWorkouts';

const NewExerciseSchema = z.object({
  name: z.string().trim().nonempty("Esse campo não pode estar vazio"),
  series: z.coerce.number("Esse campo só aceita números").min(1, "Adicione a quantidade de séries"),
  repetitions: z.coerce.number("Esse campo só aceita números").min(1, "Adicione a quantidade de repetições"),
  weight: z.coerce.number("Esse campo só aceita números"),
  muscleGroup: z.string().trim().nonempty("Selecione um grupo muscular"),
  notes: z.string().trim().optional(),
})

export function NewExercise() {
  const theme = useTheme()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const { currentWorkout } = useWorkouts()
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
        name: "",
        series: '3',
        repetitions: '12',
        weight: '0',
        muscleGroup: "",
        notes: "",
    },
    resolver: zodResolver(NewExerciseSchema)
  })

  /**
 * 
 * @param {z.infer<NewExerciseSchema>} newExercise 
 */
  async function handleCreateNewExercise(newExercise) {
    setIsLoading(true)
    try {
      await createNewExercise(currentWorkout.id, newExercise)
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
                    label="Nome do exercício"
                    icon={<Barbell size={24} weight="fill" color={theme.colors.primary} />}
                    placeholder="Nome do exercício" 
                    value={value}
                    onChangeText={onChange}
                    keyboardType="default"
                  />
                )}
              />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            
              
              <ControllerWrapper>
                <Controller 
                    name="series"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CustomInput 
                            label="Séries"
                            placeholder="Quantidade de séries" 
                            value={value}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                            style={{ width: '48%' }}
                        />
                    )}
                />

                <Controller 
                    name="repetitions"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CustomInput 
                            label="Repetições"
                            placeholder="Quantidade de repetições" 
                            value={value}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                            style={{ width: '48%' }}
                        />
                    )}
                />
              </ControllerWrapper>
                {errors.series && <ErrorText>{errors.series.message}</ErrorText>}
                {errors.repetitions && <ErrorText>{errors.repetitions.message}</ErrorText>}
            
                <Controller 
                    name="weight"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CustomInput 
                            label="Peso"
                            placeholder="Quantos kg" 
                            value={value}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                        />
                    )}
                />
                {errors.weight && <ErrorText>{errors.weight.message}</ErrorText>}

                <Controller 
                    name="muscleGroup"
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                    <SelectInput
                        label="Grupo muscular"
                        value={value}
                        onChange={onChange}
                        options={[
                            "Peito",
                            "Costas",
                            "Bíceps",
                            "Tríceps",
                            "Ombros",
                            "Abdômen",
                            "Pernas",
                            "Glúteos"
                        ]}
                    />
                    )}
                />
                {errors.muscleGroup && <ErrorText>{errors.muscleGroup.message}</ErrorText>}

              <Controller 
                name="notes"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CustomInput 
                    label="Observações"
                    placeholder="Coloque observações sobre o exercício" 
                    value={value}
                    onChangeText={onChange}
                    keyboardType="default"
                  />
                )}
              />
              {errors.notes && <ErrorText>{errors.notes.message}</ErrorText>}

              <CustomButton
                title="Adicionar Exercício" 
                onPress={handleSubmit(handleCreateNewExercise)} 
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
