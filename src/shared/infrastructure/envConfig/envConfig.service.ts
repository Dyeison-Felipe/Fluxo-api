import { Injectable } from '@nestjs/common';
import { EnvConfig, NodeEnv } from './envConfig.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private readonly configService: ConfigService) {}
  getOrigin(): string {
    return this.configService.get<string>('ORIGIN_CORS');
  }

  getMethods(): string {
    return this.configService.get<string>('METHODS_CORS');
  }

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

  getNodeEnv(): NodeEnv {
    return this.configService.get<NodeEnv>('NODE_ENV');
  }

  getEncryptionSalts(): number {
    return +this.configService.get<string>('ENCRYPTION_SALTS');
  }

  getCookiesSecret(): string {
    return this.configService.get<string>('COOKIE_SECRET');
  }

  getUserEmailApplication(): string {
    return this.configService.get<string>('APPLICATION_MAIL_USER');
  }

  getUserPasswordApplication(): string {
    return this.configService.get<string>('APPLICATION_MAIL_PASSWORD');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getExpiresIn(): number {
    return this.configService.get<number>('JWT_EXPIRES_IN');
  }

  getRefreshTokenSecret(): string {
    return this.configService.get<string>('REFRESH_TOKEN_SECRET');
  }

  getRefreshExpiresIn(): number {
    return this.configService.get<number>('REFRESH_EXPIRES_IN');
  }
}
