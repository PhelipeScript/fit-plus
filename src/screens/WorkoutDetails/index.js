import { TouchableOpacity } from "react-native";
import { Container, DescriptionText, EmptyIcon, EmptyText, ExerciseCard, ExerciseCheckbox, ExerciseCheckboxMarked, ExerciseInfoText, ExerciseList, ExerciseListEmpty, ExerciseTitle, Header, InfoContainer, Main, TabsContainer, TabText, TabTextWrapper } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useWorkouts } from "../../hooks/useWorkouts";
import { useTheme } from "styled-components/native";
import { Divider } from './../../components/Divider/index';
import { CustomButton } from './../../components/CustomButton/index';
import { Barbell, Calendar, CalendarDots, Fire, Heartbeat, Info, Pencil, Play, Plus, Trash,  } from "phosphor-react-native";
import { ActivityIndicator } from "react-native-paper";
import { InfoCard } from "../../components/cards/InfoCard";
import { deleteWorkout } from "../../services/firestoreService";

export function WorkoutDetails() {
  const theme = useTheme()
  const navigation = useNavigation()
  const [isRemoving, setIsRemoving] = useState(false)
  const { currentWorkout, exercisesCurrentWorkout: exercises } = useWorkouts() 
  const [currentTab, setCurrentTab] = useState( /** @type {'exercise' | 'info'} */ ('exercise'))

  function goToNewExercise() {
    navigation.push('NewExercise')
  }

  async function handleDeleteWorkout() {
    setIsRemoving(true)
    try {
      // no futuro vou adicionar um modal de confirmação antes
      await deleteWorkout(currentWorkout.id)
      navigation.goBack()
    } catch (error) {
      console.error(error)
    } finally {
      setIsRemoving(false)
    }
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
      
      {currentTab === 'exercise' ? (
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
      ) : (
        <Main>
          <InfoContainer>
            <InfoCard
              onPress={() => console.log('Nome')} 
              icon={Info} 
              title="Nome" 
              value={currentWorkout.name}  
            />

            <InfoCard
              onPress={() => console.log('Frequência')} 
              icon={CalendarDots} 
              title="Frequência" 
              value={currentWorkout.frequency}  
            />

            <InfoCard
              onPress={() => console.log('Calorias')} 
              icon={Fire} 
              title="Calorias" 
              value={`${currentWorkout.kcal} kcal`}  
            />

            <InfoCard
              onPress={() => console.log('Nível')} 
              icon={Heartbeat} 
              title="Nível" 
              value={currentWorkout.level}  
            />

            <InfoCard
              onPress={() => console.log('Total de treinos')} 
              icon={Barbell} 
              title="Total de exercícios" 
              value={currentWorkout.totalExercises}  
            />

            <InfoCard
              onPress={() => console.log('Data de criação')} 
              icon={Calendar} 
              title="Data de criação" 
              value={new Date(currentWorkout.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}  
            />
          </InfoContainer>

          <CustomButton 
            title="Editar treino"
            icon={Pencil}
            type="SECONDARY"
          />

          <CustomButton 
            title="Remover treino"
            icon={Trash}
            type="DANGER"
            isLoading={isRemoving}
            onPress={handleDeleteWorkout}
          />
        </Main>
      )}
    </Container>
  ) : (
    <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={theme.colors.primary} />
    </Container>
  )
}
