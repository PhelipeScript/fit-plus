export class UserNotFoundError extends Error {
  /**
   * 
   * @param {string} message 
   */
  constructor(message = "Usuário não encontrado.") {
    super(message)
  }
}
