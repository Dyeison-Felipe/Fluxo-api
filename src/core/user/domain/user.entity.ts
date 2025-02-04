import { Role } from 'src/core/roles/domain/role.entity';
import { Auditable, AuditableProps } from 'src/shared/domain/auditable.entity';

type UserProps = AuditableProps & {
  id?: number;
  username: string;
  password: string;
  role: Role
};

export class User extends Auditable {
  id: number;
  username: string;
  password: string;
  role: Role

  constructor(props?: UserProps) {
    super(props);
    this.id = props?.id;
    this.username = props.username;
    this.password = props.password;
    this.createdAt = props?.createdAt;
    this.updatedAt = props?.updatedAt;
    this.deletedAt = props?.deletedAt;
    this.role = props?.role;
  }
}
