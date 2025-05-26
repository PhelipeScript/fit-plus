import { createContext, useEffect, useState } from "react";
import { getUserWorkouts } from '../services/firestoreService'
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

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts, fetchWorkouts, currentWorkout, setCurrentWorkout }}>
      {children}
    </WorkoutContext.Provider>
  )
} 
