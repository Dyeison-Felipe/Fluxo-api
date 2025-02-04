import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { UserOutput } from 'src/core/user/infrastructure/output/user.output';
import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/repository/user.repository';
import { RoleRepository } from 'src/core/roles/domain/repositories/role.repository';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';

type Input = {
  username: string;
  password: string;
  role: number;
};

export type Output = UserOutput;

export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryption: Encryption,
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(userDto: Input): Promise<Output> {
    const existUser = await this.userRepository.existUsername(userDto.username);

    if (existUser) {
      throw new ConflictError(`user ${userDto.username} already exist`);
    }

    console.log("🚀 ~ CreateUserUseCase ~ execute ~ userDto.rol:", userDto.role)
    const existRole = await this.roleRepository.findById(userDto.role);
    console.log("🚀 ~ CreateUserUseCase ~ execute ~ existRole:", existRole)

    if(!existRole) {
      throw new ResourceNotFoundError(`Role id ${userDto.role} not found`);
    }

    const passwordHash = this.encryption.generateHash(userDto.password);

    const userEntity = new User({
      username: userDto.username,
      password: passwordHash,
      role: existRole,
    });

    const createUser = await this.userRepository.create(userEntity);

    const output: Output = {
      id: createUser.id,
      username: createUser.username,
      role: createUser.role,
      createdAt: createUser.createdAt,
      updatedAt: createUser.updatedAt,
      deletedAt: createUser.deletedAt,
    };

    return output;
  }
}
