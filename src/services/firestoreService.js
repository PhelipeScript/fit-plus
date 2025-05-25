import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { UserNotFoundError } from '../errors/UserNotFoundError';
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
