import { Text } from "react-native";
import { Container } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useWorkouts } from "../../hooks/useWorkouts";
import { useTheme } from "styled-components/native";

export function WorkoutDetails() {
  const theme = useTheme()
  const navigation = useNavigation()
  /** @type {{ params: { workoutId: string } }} */
  const { params: { workoutId } } = useRoute()
  const { workouts } = useWorkouts() 
  const [workout, setWorkout] = useState(/** @type {WorkoutProps | null} */(null))

  useEffect(() => {
    const currentWorkout = workouts.find(w => w.id === workoutId);
    if (currentWorkout) {
      setWorkout(currentWorkout);
      navigation.setOptions({
        title: currentWorkout.name,
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: theme.fontFamily.bold,
        }
      })
    }
  }, [workoutId, workouts])

  return (
    <Container>
      <Text>Tela de detalhes do treino</Text>
      <Text>{workout?.name}</Text>
    </Container>
  )
}
