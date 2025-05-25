import { addDoc, collection, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { UserNotFoundError } from '../errors/UserNotFoundError';
/** @type {import('../types/userProps').UserProps} UserProps */

/**
 * Cria um novo usuário no Firestore.
 * @param {UserProps} user 
 * @returns {Promise<void>}
 */
export async function createUser({ uid, name, email }) {
  const userRef = doc(db, 'users', uid);

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

    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
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
    await updateDoc(userRef, {...user, updatedAt: Timestamp.now()});
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new Error("Não foi possível atualizar os dados do usuário.");
  }
}

/**
 * Adiciona um novo treino à subcoleção "workouts" do usuário autenticado.
 * @param {object} workout
 * @returns {Promise<void>} 
 */
export async function createNewWorkout(workoutData) {
  try {
    const userId = auth.currentUser?.uid;
    const userWorkoutsRef = collection(db, `users/${userId}/workouts`);
    await addDoc(userWorkoutsRef, {
      ...workoutData,
      createdAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Erro ao adicionar treino:', error);
    throw new Error('Não foi possível adicionar o treino.');
  }
}
