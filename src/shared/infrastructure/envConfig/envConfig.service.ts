import { Injectable } from '@nestjs/common';
import { EnvConfig } from './envConfig.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private readonly configService: ConfigService) {}

  getDbPort(): number {
    return +this.configService.get<number>('DB_PORT');
  }

  getDbUser(): string {
    return this.configService.get<string>('DB_USER');
  }

  getDbName(): string {
    return this.configService.get<string>('DB_DATABASE');
  }

  getDbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  getDbHost(): string {
    return this.configService.get<string>('DB_LOCALHOST');
  }

  getPort(): number {
    return +this.configService.get<number>('PORT');
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  getEncryptionSalts(): number {
    return +this.configService.get<string>('ENCRYPTION_SALTS');
  }

  getUserEmailApplication(): string {
    return this.configService.get<string>('APPLICATION_MAIL_USER');
  }

  getUserPasswordApplication(): string {
    return this.configService.get<string>('APPLICATION_MAIL_PASSWORD');
  }
}
