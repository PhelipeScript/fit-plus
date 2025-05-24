import { Container, DescriptionText, EmptyIcon, EmptyText, NewWorkout, NewWorkoutIcon, Title, WorkoutList, WorkoutListEmpty } from "./styles";
import { GenericCard } from '../../components/cards/GenericCard/index';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export function Workouts() {
  const navigation = useNavigation()
  const [workouts, setWorkouts] = useState([])

  function goToNewWorkout() {
    navigation.push('NewWorkout')
  }

  return (
    <Container>
      {workouts.length > 0 && <Title>Meus treinos</Title>}

      <WorkoutList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GenericCard 
            title={item.name} 
            subtitle={item.exercises.length + ' exercícios'}
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
