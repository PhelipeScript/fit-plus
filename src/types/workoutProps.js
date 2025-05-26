/**
 * @typedef {Object} WorkoutProps
 * @property {string} id 
 * @property {string} name 
 * @property {string} description 
 * @property {'Diariamente'| '3x por semana'| '2x por semana'| '1x por semana'} frequency 
 * @property {string} kcal 
 * @property {'Iniciante', 'Intermediário', 'Avançado'} level 
 * @property {Date} createdAt 
 * @exports WorkoutProps
 * 
 * @typedef {Object} WorkoutContextProps
 * @property {WorkoutProps[]} workouts
 * @property {(workouts: WorkoutProps[]) => void} setWorkouts 
 * @property {() => Promise<void>} fetchWorkouts 
 * @exports WorkoutContextProps
 */
