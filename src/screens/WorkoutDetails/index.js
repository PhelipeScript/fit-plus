import { TouchableOpacity } from "react-native";
import { Container, DescriptionText, EmptyIcon, EmptyText, ExerciseCard, ExerciseCheckbox, ExerciseCheckboxMarked, ExerciseInfoText, ExerciseList, ExerciseListEmpty, ExerciseTitle, Header, Main, TabsContainer, TabText, TabTextWrapper } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useWorkouts } from "../../hooks/useWorkouts";
import { useTheme } from "styled-components/native";
import { Divider } from './../../components/Divider/index';
import { CustomButton } from './../../components/CustomButton/index';
import { Play, Plus } from "phosphor-react-native";
import { ActivityIndicator } from "react-native-paper";

export function WorkoutDetails() {
  const theme = useTheme()
  const navigation = useNavigation()
  const { currentWorkout, exercisesCurrentWorkout: exercises } = useWorkouts() 
  const [currentTab, setCurrentTab] = useState( /** @type {'exercise' | 'info'} */ ('exercise'))

  function goToNewExercise() {
    navigation.push('NewExercise')
  }

  useEffect(() => {
    if (currentWorkout) {
      navigation.setOptions({
        title: currentWorkout.name,
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: theme.fontFamily.bold,
        }
      })
    }
  }, [currentWorkout])

  return currentWorkout ? (
    <Container>
      <Header>
        <DescriptionText>{currentWorkout.description}</DescriptionText>
      </Header>

      <TabsContainer>
        <TabTextWrapper onPress={() => setCurrentTab('exercise')} active={currentTab === 'exercise'}>
          <TabText active={currentTab === 'exercise'}>Exercícios</TabText>
        </TabTextWrapper>
        <Divider vertical />
        <TabTextWrapper onPress={() => setCurrentTab('info')} active={currentTab === 'info'}>
          <TabText active={currentTab === 'info'}>Informações</TabText>
        </TabTextWrapper>
      </TabsContainer>
      
      <Main>
        <ExerciseList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseCard>
              <ExerciseTitle>{item.name}</ExerciseTitle>
              <ExerciseInfoText>{item.repetitions} rep</ExerciseInfoText>
              <Divider vertical />
              <ExerciseInfoText>{item.weight} kg</ExerciseInfoText>
              <TouchableOpacity>
                {item.done ? <ExerciseCheckboxMarked /> : <ExerciseCheckbox />}
              </TouchableOpacity>
            </ExerciseCard>
          )}
          ListEmptyComponent={(
            <ExerciseListEmpty>
              <EmptyIcon />
              <EmptyText>Não há exercícios cadastrados neste treino</EmptyText>
            </ExerciseListEmpty>
          )}
          contentContainerStyle={exercises.length === 0 
            ? {flex: 1} 
            : { minWidth: '100%', gap: 16, paddingBottom: 60 }
          }
        />

        <CustomButton 
          title="Adicionar exercício"
          icon={Plus}
          type="SECONDARY"
          onPress={goToNewExercise}
        />

        <CustomButton 
          title="Iniciar treino"
          icon={Play}
        />
      </Main>
    </Container>
  ) : (
    <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={theme.colors.primary} />
    </Container>
  )
}
