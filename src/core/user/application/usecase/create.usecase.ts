import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { UserOutput } from 'src/shared/application/output/user.output';
import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.interface';

type Input = {
  username: string;
  password: string;
};

type Output = UserOutput;

export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryption: Encryption,
  ) {}

  async execute(userDto: Input): Promise<Output> {
    const existUser = await this.userRepository.existUsername(userDto.username);

    if (existUser) {
      throw new ConflictError(`user ${userDto.username} already exist`);
    }

    const passwordHash = this.encryption.generateHash(userDto.password);

    const userEntity = new User({
      username: userDto.username,
      password: passwordHash,
    });

    const createUser = await this.userRepository.create(userEntity);

    const output: Output = createUser;

    return output;
  }
}
