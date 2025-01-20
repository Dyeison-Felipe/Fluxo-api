import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { JwtService } from 'src/shared/application/utils/jwtService/jwtService';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
import { EnvConfig } from 'src/shared/infrastructure/envConfig/envConfig.interface';
import { UserRepository } from '../../domain/user.interface';
import { LoggedUserService } from 'src/shared/application/utils/loggedUser/loggedUser';
import { CookiesName } from 'src/shared/application/constants/cookiesName';
import { AuthenticatePayload } from 'src/shared/application/utils/auth/auth.service';
import { ErrorMessages } from 'src/shared/application/constants/errorMessages';
import { InvalidTokenError } from 'src/shared/application/errors/invalidTokenError';

export class RefreshTokenGuard implements CanActivate {
  constructor(
    @Inject(Providers.ENV_CONFIG_SERVICE)
    private readonly envConfigService: EnvConfig,
    @Inject(Providers.JWT_SERVICE)
    private readonly jwtService: JwtService,
    @Inject(Providers.USER_REPOSITORY_IMPL)
    private readonly userRepository: UserRepository,
    @Inject(Providers.LOGGED_USER_SERVICE)
    private readonly loggedUser: LoggedUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies[CookiesName.REFRESH_TOKEN];

    if (!refreshToken) {
      throw new InvalidTokenError(ErrorMessages.INVALID_TOKEN);
    }

    const refreshTokenSecret = this.envConfigService.getRefreshTokenSecret();

    const isRefreshTokenValid = await this.jwtService.verifyJwt(refreshToken, {
      secret: refreshTokenSecret,
    });

    if (!isRefreshTokenValid) {
      throw new InvalidTokenError(ErrorMessages.INVALID_TOKEN);
    }

    const jwtPayload =
      await this.jwtService.decodeJwt<AuthenticatePayload>(refreshToken);

    const loggedUser = await this.userRepository.existUser(jwtPayload.sub);

    if (!loggedUser) {
      throw new Error('');
    }

    this.loggedUser.setLoggedUser(loggedUser);

    return true;
  }
}
