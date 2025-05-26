import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";

/**
 * @returns {WorkoutContextProps}
 */
export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkouts deve ser usado dentro do WorkoutProvider');
  return context;
}
