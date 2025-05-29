import { createContext, useEffect, useState } from "react";
import { getExercisesByWorkout, getUserWorkouts, getWorkout } from '../services/firestoreService'
/** @typedef {import('../types/workoutProps').WorkoutContextProps} */

/** @type {import("react").Context<WorkoutContextProps>} */
export const WorkoutContext = createContext(null)

/**
 * 
 * @param {{ children: React.ReactNode }} props 
 */
export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState(/** @type {WorkoutProps[]} */([]))
  const [currentWorkout, setCurrentWorkout] = useState(/** @type {WorkoutProps | null} */(null))
  const [exercisesCurrentWorkout, setExercisesCurrentWorkout] = useState(/** @type {ExerciseProps[]} */([]))
  const [currentExercise, setCurrentExercise] = useState(/** @type {ExerciseProps | null} */ (null))

  /**
   * Busca todos os treinos do usuário autenticado.
   * @returns {Promise<void>}
   */
  async function fetchWorkouts() {
    try {
      const data = await getUserWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
    } 
  }

  async function fetchExercisesCurrentWorkout() {
    try {
      const data = await getExercisesByWorkout(currentWorkout.id);
      setExercisesCurrentWorkout(data);
    } catch (error) {
      console.error('Erro ao buscar exercícios:', error);
    }
  }

  async function getCurrentWorkoutUpdated() {
    try {
      const data = await getWorkout(currentWorkout.id)
      setCurrentWorkout(data);

      const workoutsUpdated = workouts.filter(w => w.id !== currentWorkout.id)
      workoutsUpdated.push(data)
      setWorkouts(workoutsUpdated)
    } catch (error) {
      console.error('Erro ao buscar o treino atual', error)
    }
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);
  
  useEffect(() => {
    if (currentWorkout) {
      fetchExercisesCurrentWorkout()
    } else {
      setExercisesCurrentWorkout([])
    }
  }, [currentWorkout])

  return (
    <WorkoutContext.Provider 
      value={{ 
        workouts, 
        setWorkouts, 
        fetchWorkouts, 
        fetchExercisesCurrentWorkout,
        currentWorkout, 
        setCurrentWorkout,
        exercisesCurrentWorkout,
        setExercisesCurrentWorkout,
        getCurrentWorkoutUpdated,
        currentExercise,
        setCurrentExercise,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  )
} 
