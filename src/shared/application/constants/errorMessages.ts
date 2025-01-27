export class ErrorMessages {
  static accessInvalid() {
    return `Username ou senha inválidos`;
  }

  static tokenInvalid() {
    return `Token inválido`;
  }

  static conflict(param: unknown) {
    return `${param} já existe`;
  }
}
