import { AuditableOutput } from '../../../../shared/application/output/autitable.output';

export type UserOutput = AuditableOutput & {
  id: number;
  username: string;
};
