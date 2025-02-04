import { RoleOutput } from 'src/core/roles/infrastructure/output/role.output';
import { AuditableOutput } from '../../../../shared/application/output/autitable.output';

export type UserOutput = AuditableOutput & {
  id: number;
  username: string;
  role: RoleOutput;
};
