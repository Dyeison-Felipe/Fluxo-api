export interface EnvConfig {
  getDbPort(): number;
  getDbHost(): string;
  getDbName(): string;
  getDbPassword(): string;
  getDbUser(): string;
  getPort(): number;
  getNodeEnv(): string;
  getEncryptionSalts(): number;
}
