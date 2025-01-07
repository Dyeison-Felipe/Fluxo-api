import { User } from './user.entity';

export interface UserRepository {
  create(userDto: User): Promise<User>;
  update(updateDto: User): Promise<User>;
  existUsername(username: string): Promise<boolean>;
  existUser(id: number): Promise<User>;
}
