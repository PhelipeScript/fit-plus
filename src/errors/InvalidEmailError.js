export class InvalidEmailError extends Error {
  /**
   * 
   * @param {string} message 
   */
  constructor(message = "E-mail inválido. Verifique o formato do e-mail.") {
    super(message)
  }
}
