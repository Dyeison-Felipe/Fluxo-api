export interface Encryption {
  compareHash(passwordCompare: string, passwordEncrypted: string): boolean;
  generateHash(password: string): string;
}
