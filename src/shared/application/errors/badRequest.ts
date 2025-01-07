export class BadRequestError extends Error {
  constructor(public message: string = 'Bad credentials') {
    super(message);
    this.name = 'BadRequestError';
  }
}
