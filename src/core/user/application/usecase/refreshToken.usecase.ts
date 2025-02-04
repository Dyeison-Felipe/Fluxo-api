import { BadRequestError } from "src/shared/application/errors/badRequest";
import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { AuthService } from "src/shared/application/utils/auth/auth.service";
import { SetCookies } from "src/shared/application/utils/cookies/cookies";
import { LoggedUserService } from "src/shared/application/utils/loggedUser/loggedUser";

export type Input = {
	setCookies: SetCookies;
};

export type Output = undefined;

export class RefreshTokenUseCase implements UseCase<Input, Output> {
	constructor(
		private readonly authService: AuthService,
		private readonly loggedUserService: LoggedUserService,
	) {}

	async execute({ setCookies }: Input): Promise<Output> {
		const loggedUser = this.loggedUserService.getLoggedUser();

		if (!loggedUser) {
			throw new BadRequestError(`User not found`);
		}

		const { accessToken } = await this.authService.refresh(loggedUser);

		this.authService.setAccessTokenInCookies({ accessToken, setCookies });
	}
}