import { Text } from "react-native";
import { Container } from "./styles";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useWorkouts } from "../../hooks/useWorkouts";

export function WorkoutDetails() {
  /** @type {{ params: { workoutId: string } }} */
  const { params: { workoutId } } = useRoute()
  const { workouts } = useWorkouts() 
  const [workout, setWorkout] = useState(/** @type {WorkoutProps | null} */(null))

  useEffect(() => {
    const currentWorkout = workouts.find(w => w.id === workoutId);
    if (currentWorkout) 
      setWorkout(currentWorkout);
  }, [workoutId, workouts])

  return (
    <Container>
      <Text>Tela de detalhes do treino</Text>
      <Text>{workout?.name}</Text>
    </Container>
  )
}
