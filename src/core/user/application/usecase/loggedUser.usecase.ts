import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { AuthService } from "src/shared/application/utils/auth/auth.service";
import { ClearCookies } from "src/shared/application/utils/cookies/cookies";

type Input = {
  clearCookies: ClearCookies;
}

type Output = undefined;

export class LoggedUserUseCase implements UseCase<Input, Output> {
  constructor(private readonly authService: AuthService) { }
  execute({ clearCookies }: Input): Output {
    this.authService.clearAuthCookies({ clearCookies });
  }
}