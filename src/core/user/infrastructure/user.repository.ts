import { UserRepository } from '../domain/user.interface';
import { UserSchema } from './user.schema';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async create(userDto: User): Promise<User> {
    const createUser = await this.userRepository.save(userDto);
    return createUser;
  }

  async update(updateDto: User): Promise<User> {
    const updateUser = await this.userRepository.save(updateDto);
    return updateUser;
  }

  async existUsername(username: string): Promise<boolean> {
    const existUsername = await this.userRepository.existsBy({ username });

    return existUsername;
  }

  async existUser(id: number): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { id },
    });
    return existUser;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    return user;
  }
}
