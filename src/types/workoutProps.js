/**
 * @typedef {Object} WorkoutProps
 * @property {string} id 
 * @property {string} name 
 * @property {string} description 
 * @property {'Diariamente'| '3x por semana'| '2x por semana'| '1x por semana'} frequency 
 * @property {string} kcal 
 * @property {'Iniciante' | 'Intermediário' | 'Avançado'} level 
 * @property {number} totalExercises
 * @property {string} createdAt 
 * @property {string} updatedAt 
 * @exports WorkoutProps
 * 
 * @typedef {Object} WorkoutContextProps
 * @property {WorkoutProps[]} workouts
 * @property {(workouts: WorkoutProps[]) => void} setWorkouts 
 * @property {WorkoutProps} currentWorkout
 * @property {(workouts: WorkoutProps) => void} setCurrentWorkout 
 * @property {ExerciseProps} currentExercise
 * @property {(workouts: ExerciseProps) => void} setCurrentExercise
 * @property {ExerciseProps[]} exercisesCurrentWorkout
 * @property {(exercises: ExerciseProps[]) => void} setExercisesCurrentWorkout 
 * @property {() => Promise<void>} fetchWorkouts 
 * @property {() => Promise<void>} fetchExercisesCurrentWorkout
 * @property {() => Promise<void>} getCurrentWorkoutUpdated 
 * @exports WorkoutContextProps
 * 
 * @typedef {Object} ExerciseProps
 * @property {string} id
 * @property {string} name 
 * @property {number} series 
 * @property {number} repetitions 
 * @property {number} weight 
 * @property {"Peito" | "Costas" | "Bíceps" | "Tríceps" | "Ombros" | "Abdômen" | "Pernas" | "Glúteos"} muscleGroup 
 * @property {string?} notes 
 * @property {string} createdAt 
 * @property {string} updatedAt 
 * @exports ExerciseProps
 * 
 * @typedef {Object} WorkoutSessionProps 
 * @property {string} id 
 * @property {string} startedAt
 * @property {string?} endedAt
 * @property {'in_progress' | 'finished'} status
 * @property {{ seconds: number, minutes: number, hours: number }} duration
 * @property {ExerciseSessionProps[]} exercises
 * @exports WorkoutSessionProps
 * 
 * 
 * @typedef {Object} ExerciseSessionProps 
 * @property {string} id
 * @property {string} name 
 * @property {number} series 
 * @property {number} repetitions 
 * @property {number} weight 
 * @property {"Peito" | "Costas" | "Bíceps" | "Tríceps" | "Ombros" | "Abdômen" | "Pernas" | "Glúteos"} muscleGroup 
 * @property {string?} notes 
 * @property {boolean} done
 * @property {string} createdAt 
 * @exports ExerciseSessionProps
 * 
 * 
 */
