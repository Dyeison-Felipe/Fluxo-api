import { Injectable, Scope } from '@nestjs/common';
import { User } from 'src/core/user/domain/user.entity';
import { LoggedUserService } from 'src/shared/application/utils/loggedUser/loggedUser';

@Injectable({ scope: Scope.REQUEST })
export class LoggedUserNestjsService implements LoggedUserService {
  private loggedUser: User;

  getLoggedUser(): User {
    return this.loggedUser;
  }

  setLoggedUser(loggedUser: User) {
    this.loggedUser = loggedUser;
  }
}
