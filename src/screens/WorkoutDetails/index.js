import { TouchableOpacity } from "react-native";
import { Container, DescriptionText, EmptyIcon, EmptyText, ExerciseCard, ExerciseCheckbox, ExerciseCheckboxMarked, ExerciseInfoText, ExerciseList, ExerciseListEmpty, ExerciseTitle, Header, InfoContainer, Main, TabsContainer, TabText, TabTextWrapper } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useWorkouts } from "../../hooks/useWorkouts";
import { useTheme } from "styled-components/native";
import { Divider } from './../../components/Divider/index';
import { CustomButton } from './../../components/CustomButton/index';
import { Barbell, Calendar, CalendarDots, Fire, Heartbeat, Info, Pencil, Play, Plus, StopCircle, Trash,  } from "phosphor-react-native";
import { ActivityIndicator } from "react-native-paper";
import { InfoCard } from "../../components/cards/InfoCard";
import { createWorkoutSession, deleteWorkout, finishSession, getInProgressSession } from "../../services/firestoreService";
import { ExerciseDetailsModal } from "../../components/modals/ExerciseDetailsModal";
import { DeleteConfirmationModal } from "../../components/modals/DeleteConfirmationModal";

export function WorkoutDetails() {
  const theme = useTheme()
  const navigation = useNavigation()
  const [isRemoving, setIsRemoving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { 
    currentWorkout, 
    exercisesCurrentWorkout, 
    getCurrentWorkoutUpdated,
    setCurrentExercise,
    currentExercise,
    fetchExercisesCurrentWorkout,
  } = useWorkouts() 
  const [currentTab, setCurrentTab] = useState( /** @type {'exercise' | 'info'} */ ('exercise'))
  const [ExerciseDetailsModalVisible, setExerciseDetailsModalVisible] = useState(false);
  const [delConfirmModalVisible, setDelConfirmModalVisible] = useState(false)
  const [isRunningWorkout, setIsRunningWorkout] = useState(false)
  const [sessionExercises, setSessionExercises] = useState(/** @type {ExerciseProps[]} */([]))
  const [currentSession, setCurrentSession] = useState( /** @type {WorkoutSessionProps | null} */ (null))

  function goToNewExercise() {
    navigation.push('NewExercise')
  }
  
  function goToEditWorkout() {
    navigation.push('EditWorkout')
  }

  async function handleStartWorkout() {
    if (sessionExercises.length === 0)
      alert("Adicione pelo menos 1 exercício antes de iniciar o treino.")
    else {
      setIsLoading(true)
      try {
        await createWorkoutSession(currentWorkout.id, sessionExercises)
        await getCurrentSession()
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
        setIsRunningWorkout(true)
      }
    }
  }

  async function handleFinishWorkout() {
    try {
      setIsLoading(true)
      await finishSession(currentWorkout.id, currentSession, sessionExercises)
      setIsRunningWorkout(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function getCurrentSession() {
    try {
      const session = await getInProgressSession(currentWorkout.id)

      if (session) {
        setIsRunningWorkout(true)
      }

      setCurrentSession(session)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 
   * @param {ExerciseProps} exercise 
   */
  function handleToggleExerciseStatus(exercise) {
    setSessionExercises(state => state.map(ex => {
      if (ex.id === exercise.id) {
        ex.done = !ex.done
      }
      return ex
    }))

  }

  function handleOpenExerciseDetailsModal(exercise) {
    setCurrentExercise(exercise);
    setExerciseDetailsModalVisible(true);
  }

  /**
   * 
   * @param {'edit' | 'deleted' | 'done' | null} action
   */
  function handleModalDismiss(action) {
    setExerciseDetailsModalVisible(false)
    !action && setCurrentExercise(null)
    if (action === 'deleted') 
      fetchExercisesCurrentWorkout()
    else if (action === 'done') {
      handleToggleExerciseStatus(currentExercise)
      setCurrentExercise(null)
    }
  }

  async function handleDeleteWorkout() {
    setDelConfirmModalVisible(false)
    setIsRemoving(true)
    try {
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
      getCurrentSession()

      navigation.setOptions({
        title: currentWorkout.name,
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: theme.fontFamily.bold,
        }
      })
    }
  }, [currentWorkout])

  useEffect(() => {
    setSessionExercises(exercisesCurrentWorkout.map(ex => ({...ex, done: false})))
  }, [exercisesCurrentWorkout])

  useFocusEffect(useCallback(() => {
    getCurrentWorkoutUpdated()
  }, []))

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
            data={sessionExercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard onPress={() => handleOpenExerciseDetailsModal(item)}>
                <ExerciseTitle>{item.name}</ExerciseTitle>
                <ExerciseInfoText>{item.repetitions} rep</ExerciseInfoText>
                <Divider vertical />
                <ExerciseInfoText>{item.weight} kg</ExerciseInfoText>
                {isRunningWorkout && (
                  <TouchableOpacity onPress={() => handleToggleExerciseStatus(item)}>
                    {item.done ? <ExerciseCheckboxMarked /> : <ExerciseCheckbox />}
                  </TouchableOpacity>
                )}
              </ExerciseCard>
            )}
            ListEmptyComponent={(
              <ExerciseListEmpty>
                <EmptyIcon />
                <EmptyText>Não há exercícios cadastrados neste treino</EmptyText>
              </ExerciseListEmpty>
            )}
            contentContainerStyle={sessionExercises.length === 0 
              ? {flex: 1} 
              : { minWidth: '100%', gap: 16, paddingBottom: 60 }
            }
          />

          {!isRunningWorkout && (
            <CustomButton 
              title="Adicionar exercício"
              icon={Plus}
              type="SECONDARY"
              onPress={goToNewExercise}
            />
          )}

          {isRunningWorkout ? (
            <CustomButton 
              title="Finalizar treino"
              icon={StopCircle}
              type="DANGER"
              onPress={handleFinishWorkout}
              isLoading={isLoading}
            />
          ) : (
            <CustomButton 
              title="Iniciar treino"
              icon={Play}
              onPress={handleStartWorkout}
              isLoading={isLoading}
            />
          )}

          <ExerciseDetailsModal
            visible={ExerciseDetailsModalVisible} 
            onDismiss={handleModalDismiss} 
            isRunningWorkout={isRunningWorkout}
            onToggleExerciseStatus={handleToggleExerciseStatus}
          />
        </Main>
      ) : (
        <Main>
          <InfoContainer>
            <InfoCard
              icon={Info} 
              title="Nome" 
              value={currentWorkout.name}  
            />

            <InfoCard
              icon={CalendarDots} 
              title="Frequência" 
              value={currentWorkout.frequency}  
            />

            <InfoCard
              icon={Fire} 
              title="Calorias" 
              value={`${currentWorkout.kcal} kcal`}  
            />

            <InfoCard
              icon={Heartbeat} 
              title="Nível" 
              value={currentWorkout.level}  
            />

            <InfoCard
              icon={Barbell} 
              title="Total de exercícios" 
              value={currentWorkout.totalExercises}  
            />

            <InfoCard
              icon={Calendar} 
              title="Data de criação" 
              value={new Date(currentWorkout.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'short' })}  
            />

            <InfoCard
              icon={Calendar} 
              title="Última atualização" 
              value={new Date(currentWorkout.updatedAt).toLocaleDateString('pt-BR', { dateStyle: 'short' })}  
            />
          </InfoContainer>

          {!isRunningWorkout && (
            <CustomButton 
              title="Editar treino"
              icon={Pencil}
              type="SECONDARY"
              onPress={goToEditWorkout}
            />
          )}

          {!isRunningWorkout && (
            <CustomButton 
              title="Remover treino"
              icon={Trash}
              type="DANGER"
              isLoading={isRemoving}
              onPress={() => setDelConfirmModalVisible(true)}
            />
          )}

          <DeleteConfirmationModal
            visible={delConfirmModalVisible}
            onCancel={() => setDelConfirmModalVisible(false)}
            onConfirm={handleDeleteWorkout}
            message="Deseja realmente remover este treino?"
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
