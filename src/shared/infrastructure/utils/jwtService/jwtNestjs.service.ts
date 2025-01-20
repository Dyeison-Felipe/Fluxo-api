import {
  GenerateJwtToken,
  JwtGenerateOptions,
  JwtService,
  JwtVerifyOptions,
  Payload,
} from 'src/shared/application/utils/jwtService/jwtService';

import { JwtService as NestjsJwtService } from '@nestjs/jwt';

export class JwtServiceImpl implements JwtService {
  constructor(private readonly jwtService: NestjsJwtService) {}

  async generateJwt<P extends Payload>(
    payload: P,
    options: JwtGenerateOptions,
  ): Promise<GenerateJwtToken> {
    const jwtToken = await this.jwtService.signAsync(payload, options);

    return { token: jwtToken };
  }

  async verifyJwt(token: string, options: JwtVerifyOptions): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token, options);
      return true;
    } catch {
      return false;
    }
  }

  async decodeJwt<P extends Payload>(token: string): Promise<P> {
    return this.jwtService.decode(token);
  }
}
