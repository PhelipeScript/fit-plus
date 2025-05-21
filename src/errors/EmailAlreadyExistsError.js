export class EmailAlreadyExistsError extends Error {
  /**
   * 
   * @param {string} message 
   */
  constructor(message = "Este e-mail já está em uso.") {
    super(message)
  }
}
