import { User } from 'src/core/user/domain/user.entity';

export interface LoggedUserService {
  getLoggedUser(): User | null;
  setLoggedUser(loggedUser: User): void;
}
