import { UserOutput } from 'src/core/user/infrastructure/output/user.output';
import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { SetCookies } from 'src/shared/application/utils/cookies/cookies';
import { UserRepository } from '../../domain/repository/user.repository';
import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import { ErrorMessages } from 'src/shared/application/constants/errorMessages';
import { UnauthorizedExceptionError } from 'src/shared/application/errors/unauthorizedExceptionError';
import { AuthService } from 'src/shared/application/utils/auth/auth.service';
import { User } from '../../domain/user.entity';

export type Input = {
  username: string;
  password: string;
  setCookies: SetCookies;
};

export type Output = UserOutput;

export class LoginUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryption: Encryption,
    private readonly authService: AuthService,
  ) {}

  async execute(input: Input): Promise<UserOutput> {
    const user = await this.userRepository.getUserByUsername(input.username);

    if (!user) {
      throw new UnauthorizedExceptionError(ErrorMessages.accessInvalid());
    }

    const validPassword = await this.encryption.compareHash(
      input.password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedExceptionError(ErrorMessages.accessInvalid());
    }

    await this.authenticateAndHandleTokens(user, input.setCookies);

    return user;
  }

  private async authenticateAndHandleTokens(
    user: User,
    setCookies: SetCookies,
  ): Promise<void> {
    const { accessToken, refreshToken } =
      await this.authService.authenticate(user);

    this.authService.setTokenInCookies({
      accessToken,
      refreshToken,
      setCookies,
    });
    console.log('Cookies set:', { accessToken, refreshToken });
  }
}
