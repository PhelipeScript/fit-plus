import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

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
    if (error.code === 'auth/wrong-password') {
      throw new Error('Senha incorreta. Por favor, tente novamente.');
    } else if (error.code === 'auth/user-not-found') {
      throw new Error('Usuário não encontrado. Verifique o e-mail informado.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('E-mail inválido. Verifique o formato do e-mail.');
    } else {
      // Erro genérico
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
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este e-mail já está em uso. Tente fazer login ou use outro e-mail.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('A senha é muito fraca. Escolha uma senha mais segura.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('E-mail inválido. Verifique o formato do e-mail.');
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
