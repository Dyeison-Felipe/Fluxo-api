export type NodeEnv = 'production' | 'development' | 'test';

export interface EnvConfig {
  getDbPort(): number;
  getDbHost(): string;
  getDbName(): string;
  getDbPassword(): string;
  getDbUser(): string;
  getPort(): number;
  getNodeEnv(): NodeEnv;
  getEncryptionSalts(): number;
  getCookiesSecret(): string;
  getUserEmailApplication(): string;
  getUserPasswordApplication(): string;
  getJwtSecret(): string;
  getExpiresIn(): number;
  getRefreshTokenSecret(): string;
  getRefreshExpiresIn(): number;
  getOrigin(): string;
  getMethods(): string;
}
