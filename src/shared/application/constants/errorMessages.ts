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

  static badRequest(param: string) {
    return `O campo ${param} não pode estar vazio`
  }
}
