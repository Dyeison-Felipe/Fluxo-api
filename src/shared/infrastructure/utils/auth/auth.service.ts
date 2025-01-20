import { User } from 'src/core/user/domain/user.entity';
import {
  Authenticate,
  AuthenticatePayload,
  AuthService,
  ClearAuthCookiesProps,
  Refresh,
  SetAccessTokenInCookies,
  SetTokensInCookiesProps,
} from 'src/shared/application/utils/auth/auth.service';
import { EnvConfig } from '../../envConfig/envConfig.interface';
import { JwtService } from 'src/shared/application/utils/jwtService/jwtService';
import { CookiesName } from 'src/shared/application/constants/cookiesName';

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly envConfigService: EnvConfig,
    private readonly jwtService: JwtService,
  ) {}
  async authenticate(user: User): Promise<Authenticate> {
    const payload: AuthenticatePayload = {
      sub: user.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(user: User): Promise<Refresh> {
    const payload: AuthenticatePayload = {
      sub: user.id,
    };
    const accessToken = await this.generateAccessToken(payload);

    return { accessToken };
  }

  setTokenInCookies({
    accessToken,
    refreshToken,
    setCookies,
  }: SetTokensInCookiesProps): void {
    const isSecure = this.envConfigService.getNodeEnv() === 'production';

    this.setAccessTokenInCookies({ accessToken, setCookies });

    setCookies(CookiesName.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: isSecure,
      maxAge: this.envConfigService.getRefreshExpiresIn(),
      sameSite: 'Strict',
    });
  }

  setAccessTokenInCookies({
    accessToken,
    setCookies,
  }: SetAccessTokenInCookies): void {
    const isSecure = this.envConfigService.getNodeEnv() === 'production';

    setCookies(CookiesName.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: isSecure,
      maxAge: this.envConfigService.getExpiresIn(),
      sameSite: 'Strict',
    });
  }

  clearAuthCookies({ clearCookies }: ClearAuthCookiesProps): void {
    const isProduction = this.envConfigService.getNodeEnv() === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      maxAge: 0,
      sameSite: 'Strict',
    };

    clearCookies(CookiesName.ACCESS_TOKEN, cookieOptions);
    clearCookies(CookiesName.REFRESH_TOKEN, cookieOptions);
  }

  private async generateAccessToken(
    payload: AuthenticatePayload,
  ): Promise<string> {
    const accessTokenSecret = this.envConfigService.getJwtSecret();

    const accessTokenExpiresInSeconds = this.envConfigService.getExpiresIn();

    const { token } = await this.jwtService.generateJwt<typeof payload>(
      payload,
      {
        expiresIn: accessTokenExpiresInSeconds,
        secret: accessTokenSecret,
      },
    );

    return token;
  }

  private async generateRefreshToken(
    payload: AuthenticatePayload,
  ): Promise<string> {
    const refreshTokenSecret = this.envConfigService.getRefreshTokenSecret();
    const refreshTokenExpiresIn = this.envConfigService.getRefreshExpiresIn();

    const { token } = await this.jwtService.generateJwt<typeof payload>(
      payload,
      {
        expiresIn: refreshTokenExpiresIn,
        secret: refreshTokenSecret,
      },
    );

    return token;
  }
}
