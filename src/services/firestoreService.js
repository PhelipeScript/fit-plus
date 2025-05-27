import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { UserNotFoundError } from '../errors/UserNotFoundError';
/** @type {import('../types/userProps').UserProps} UserProps */
/** @typedef {import('../types/workoutProps')} */

/**
 * Cria um novo usuário no Firestore.
 * @param {UserProps} user 
 * @returns {Promise<void>}
 */
export async function createUser({ uid, name, email }) {
  const userRef = doc(db, 'users', uid);

  const now = new Date().toISOString()

  await setDoc(userRef, {
    uid,
    name,
    email,
    avatarUri: '',
    age: '',
    height: '',
    weight: '',
    phone: '',
    gender: '',
    goal: '',
    activityLevel: '',

    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Busca os dados do usuário no Firestore
 * @param {string?} uid
 * @returns {Promise<UserProps>}
 */
export async function getUser(uid) {
  try {
    if (!uid) {
      uid = auth.currentUser?.uid
    }

    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      throw new UserNotFoundError("Usuário não encontrado no Firestore");
    }

    /** @type {UserProps} */
    const userData = {
      ...docSnap.data(),
    };

    return userData;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Erro ao buscar dados do usuário.");
  }
}

/**
 * Atualiza as informações do usuário no Firestore.
 * @param {UserProps} user
 * @returns {Promise<void>}
 */
export async function updateUser(user) {
  try {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {...user, updatedAt: new Date().toISOString()});
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new Error("Não foi possível atualizar os dados do usuário.");
  }
}

/**
 * Adiciona um novo treino à subcoleção "workouts" do usuário autenticado.
 * @param {WorkoutProps} workout
 * @returns {Promise<void>} 
 */
export async function createNewWorkout(workout) {
  try {
    const now = new Date().toISOString();
    const userId = auth.currentUser?.uid;
    const userWorkoutsRef = collection(db, `users/${userId}/workouts`);
    await addDoc(userWorkoutsRef, {
      ...workout,
      createdAt: now,
      updatedAt: now,
    })
  } catch (error) {
    console.error('Erro ao adicionar treino:', error);
    throw new Error('Não foi possível adicionar o treino.');
  }
}

/**
 * Deleta um treino e todos os seus exercícios.
 * 
 * @param {string} workoutId
 * @returns {Promise<void>}
 */
export async function deleteWorkout(workoutId) {
  try {
    const userId = auth.currentUser?.uid;

    const exercisesRef = collection(db, `users/${userId}/workouts/${workoutId}/exercises`);
    const snapshot = await getDocs(exercisesRef);

    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    const workoutRef = doc(db, `users/${userId}/workouts/${workoutId}`);
    await deleteDoc(workoutRef);
  } catch (error) {
    console.error(error)
    throw new Error('Não foi possível deletar o treino.')
  }
}

/**
 * Atualiza o campo `totalExercises` do treino ao adicionar ou remover um exercício.
 * 
 * @param {string} workoutId 
 * @param {'increment' | 'decrement'} type 
 */
export async function updateTotalExercisesWorkout(workoutId, type) {
  try {
    const userId = auth.currentUser?.uid
    const workoutRef = doc(db, `users/${userId}/workouts/${workoutId}`);
    
    await updateDoc(workoutRef, {
      totalExercises: increment(type === 'increment' ? 1 : -1),
      updatedAt: new Date().toISOString(), 
    });

  } catch (error) {
    console.error("Erro ao atualizar total de exercícios:", error);
    throw error;
  }
}

/**
 * Busca todos os treinos de um usuário no Firestore.
 * @param {string?} userId 
 * @returns {Promise<WorkoutProps[]>}
 */
export async function getUserWorkouts(userId) {
  try {
    if (!userId) {
      userId = auth.currentUser?.uid
    }
    const workoutsRef = collection(db, `users/${userId}/workouts`);
    const snapshot = await getDocs(workoutsRef);

    /** @type {WorkoutProps[]} */
    const workouts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return workouts;
  } catch (error) {
    console.error('Erro ao buscar treinos:', error);
    throw new Error('Não foi possível carregar os treinos.');
  }
}

/**
 * Adiciona um novo exercício a um treino do usuário no Firestore.
 * 
 * @param {string} workoutId 
 * @param {ExerciseProps} exercise 
 * @returns {Promise<void>}
 */
export async function createNewExercise(workoutId, exercise) {
  try {
    const userId = auth.currentUser?.uid
    const exercisesRef = collection(db, `users/${userId}/workouts/${workoutId}/exercises`);
    await addDoc(exercisesRef, {...exercise, createdAt: new Date().toISOString()});
    await updateTotalExercisesWorkout(workoutId, 'increment');
  } catch (error) {
    console.error("Erro ao adicionar exercício:", error);
    throw error;
  }
}

/**
 * Busca todos os exercícios de um treino específico
 * @param {string} workoutId 
 * @returns {Promise<ExerciseProps[]>}
 */
export async function getExercisesByWorkout(workoutId) {
  try {
    const userId = auth.currentUser?.uid
    const exercisesRef = collection(db, `users/${userId}/workouts/${workoutId}/exercises`);

    const snapshot = await getDocs(exercisesRef);

    /** @type {ExerciseProps[]} */
    const exercises = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return exercises;
  } catch (error) {
    console.error("Erro ao buscar exercícios:", error);
    throw error;
  }
}
