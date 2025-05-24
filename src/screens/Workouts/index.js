import { Container, DescriptionText, EmptyIcon, EmptyText, Title, WorkoutList, WorkoutListEmpty } from "./styles";
import { GenericCard } from '../../components/cards/GenericCard/index';
import { useState } from "react";

export function Workouts() {
  const [workouts, setWorkouts] = useState([])


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
    </Container>
  )
}
