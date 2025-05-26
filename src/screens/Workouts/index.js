import { Container, DescriptionText, EmptyIcon, EmptyText, NewWorkout, NewWorkoutIcon, Title, WorkoutList, WorkoutListEmpty } from "./styles";
import { GenericCard } from '../../components/cards/GenericCard/index';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useWorkouts } from '../../hooks/useWorkouts';
import { useCallback } from "react";

export function Workouts() {
  const navigation = useNavigation()
  const { workouts, fetchWorkouts } = useWorkouts()

  function goToNewWorkout() {
    navigation.push('NewWorkout')
  }

  useFocusEffect(useCallback(() => {
    fetchWorkouts()
  }, []))

  return (
    <Container>
      {workouts.length > 0 && <Title>Meus treinos</Title>}

      <WorkoutList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GenericCard 
            title={item.name} 
            subtitle={item?.totalExercises + ' exercícios'}
            withFeedBack
            children={<DescriptionText>{item.description}</DescriptionText>}
          />
        )}
        ListEmptyComponent={(
          <WorkoutListEmpty>
            <EmptyIcon />
            <EmptyText>Você ainda não tem treinos cadastrados</EmptyText>
          </WorkoutListEmpty>
        )}
        contentContainerStyle={workouts.length === 0 
          ? {flex: 1} 
          : { minWidth: '100%', gap: 16, paddingBottom: 120 }
        }
      />

      <NewWorkout onPress={goToNewWorkout}>
        <NewWorkoutIcon />
      </NewWorkout>
    </Container>
  )
}
