export class UnauthorizedExceptionError extends Error {
  constructor(message: string = 'Invalid credentials') {
    super(message);
    this.name = 'UnauthorizedExceptionError';
  }
}
