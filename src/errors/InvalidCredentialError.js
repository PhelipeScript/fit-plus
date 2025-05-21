export class InvalidCredentialError extends Error {
  /**
   * 
   * @param {string} message 
   */
  constructor(message = "E-mail ou senha inválidos.") {
    super(message)
  }
}
