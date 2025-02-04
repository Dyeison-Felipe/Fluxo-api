import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InvalidTokenError } from "src/shared/application/errors/invalidTokenError";
import { UnauthorizedExceptionError } from "src/shared/application/errors/unauthorizedExceptionError";
import { AuthenticatePayload } from "src/shared/application/utils/auth/auth.service";
import { JwtService } from "src/shared/application/utils/jwtService/jwtService";
import { Providers } from "src/shared/infrastructure/constants/moduleConstants";
import { EnvConfig } from "src/shared/infrastructure/envConfig/envConfig.interface";
import { UserRepository } from "../user/domain/repository/user.repository";
import { LoggedUserService } from "src/shared/application/utils/loggedUser/loggedUser";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(Providers.JWT_SERVICE)
    private readonly jwtService: JwtService, 
    @Inject(Providers.ENV_CONFIG_SERVICE)
    private readonly envConfigService: EnvConfig,
    @Inject(Providers.USER_REPOSITORY_IMPL)
    private readonly userRepository: UserRepository,
    @Inject(Providers.LOGGED_USER_SERVICE)
    private readonly loggedUser: LoggedUserService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedExceptionError(`Tonken não fornecido`);
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedExceptionError(`Token mal fornecido`);
    }

      const accessTokenSecret  = this.envConfigService.getRefreshTokenSecret();
      const isAccessTokenValid  = await this.jwtService.verifyJwt(token, { secret: accessTokenSecret  });

      if (!isAccessTokenValid) {
        throw new InvalidTokenError(`Token inválido`);
      }

      const jwtPayload = await this.jwtService.decodeJwt<AuthenticatePayload>(token);

      const loggedUser = await this.userRepository.existUser(jwtPayload.sub);

      if(!loggedUser) {
        throw new InvalidTokenError(`Usuário não encontrado`);
      }

      this.loggedUser.setLoggedUser(loggedUser);

      return true;
  }
}