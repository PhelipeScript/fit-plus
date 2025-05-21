export class WeakPasswordError extends Error {
  /**
   * 
   * @param {string} message 
   */
  constructor(message = 'A senha é muito fraca.\n' +
    'Ela deve conter pelo menos:\n' +
    '- 1 letra maiúscula\n' +
    '- 1 letra minúscula\n' +
    '- 1 número\n' +
    '- 1 caractere especial (ex: !@#$%*)\n' +
    '- E ter no mínimo 6 caracteres'
  ) {
    super(message)
  }
}
