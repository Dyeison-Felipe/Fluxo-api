export class ResourceNotFoundError extends Error {
  constructor(message: string = 'Resource was not found') {
    super(message);
    this.name = 'ResourceNotFoundError';
  }
}
