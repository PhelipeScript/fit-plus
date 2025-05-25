import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { InvalidCredentialError } from '../errors/InvalidCredentialError';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError';
import { WeakPasswordError } from '../errors/WeakPasswordError';
import { InvalidEmailError } from '../errors/InvalidEmailError';
import { createUser } from './firestoreService';

/**
 * Realiza o login do usuário com e-mail e senha.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    // Trate erros específicos com base no código de erro
    if (error.code === 'auth/invalid-credential') {
      throw new InvalidCredentialError();
    } else if (error.code === 'auth/user-not-found') {
      throw new UserNotFoundError();
    } else {
      throw new Error('Erro ao realizar login. Tente novamente mais tarde.');
    }
  }
}

/**
 * Cria uma nova conta de usuário com e-mail e senha.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signUp(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    try {
      await createUser({ uid, name, email });
    } catch (firestoreError) {
      await deleteUser(userCredential.user);
      console.error(firestoreError)
      throw new Error('Erro ao salvar os dados do usuário.');
    }

    return userCredential;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new EmailAlreadyExistsError();
    } else if (error.code === 'auth/password-does-not-meet-requirements') {
      throw new WeakPasswordError();
    } else if (error.code === 'auth/invalid-email') {
      throw new InvalidEmailError();
    } else {
      throw new Error('Erro ao criar conta. Tente novamente mais tarde.');
    }
  }
}

/**
 * Realiza o logout do usuário.
 * @returns {Promise<void>}
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error('Erro ao sair da conta. Tente novamente.');
  }
}

/**
 * Envia um email de redefinição de senha para o email do usuário.
 * @param {string} email 
 * @returns {Promise<void>}
 */
export async function resetPasswordByEmail(email) {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw new Error('Erro ao enviar e-mail de redefinição.');
  }
}
