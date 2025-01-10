import { UserOutput } from 'src/shared/application/output/user.output';
import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { UserRepository } from '../../domain/user.interface';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';

type Input = {
  id: number;
  username: string;
};

type Output = UserOutput;

export class UpdateUserUseCase implements UseCase<Input, Output> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<UserOutput> {
    const existUsername = await this.userRepository.existUsername(
      input.username,
    );

    if (existUsername) {
      throw new ConflictError(`username ${input.username} already exist`);
    }

    const existUser = await this.userRepository.existUser(input.id);

    if (!existUser) {
      throw new ResourceNotFoundError(`user id ${input.id} not found`);
    }

    existUser.username = input.username;

    const updateUser = await this.userRepository.update(existUser);

    const output: Output = updateUser;

    return output;
  }
}
